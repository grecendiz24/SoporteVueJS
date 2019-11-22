import Vue from 'vue'
import Vuex from 'vuex'
var firebase = require("firebase/app");
import { auth, db } from '@/firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: '',
    error: '',
    tareas: [],
    camiones: [],
    tarea: { placas: '', nivTractor: '', remolque1: '', niv1: '', remolque2: '', niv2: '', dolly: '', utransporte: '', id: '' },
    choferes: [],
    choferes1: [],
    chofer: { nombre: '', paterno: '', materno: '', licencia: '', direccion: '', telefono: '', correo: '', evidencia: '', id: '' },
    entradas: [],
    entrada: { fecha: '', horaEntrada: '', chofer: '', camion: '',tipo: '',observaciones:'' },
   
  },
  mutations: {
    setUsuario(state,payload){
      state.usuario = payload
    },
    setError(state, payload){
      state.error = payload
    },
    nuevoUsuario(state, payload) {
      if (payload === null) {
        state.usuario = ''
      } else {
        state.usuario = payload
      }
    },
    setCamiones(state, camiones) {
      state.camiones = camiones
     },
    setTareas(state, tareas) {
      state.tareas = tareas
      console.log(state.tareas);
    },
    setTarea(state, tarea) {
      state.tarea = tarea
    },
    eliminarTarea(state, id) {
      state.tareas = state.tareas.filter(doc => {
        return doc.id != id
      })
    },
      /**chofer */
    setChoferes(state, choferes) {
      state.choferes = choferes
      console.log(state.choferes);
    },
    setChofer(state, chofer) {
      state.chofer = chofer
    },
    setChoferes1(state, choferes1) {
      state.choferes1 = choferes1
      console.log(state.choferes1);
    },
       /**entrada y salida */
       setEntradas(state, entradas) {
        state.entradas = entradas
        console.log(state.entradas);
      },
      setEntrada(state, entrada) {
        state.entrada = entrada
      },

  },
  actions: {
    ingresoUsuario({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.pass)
        .then(res=>{
          console.log(res);
          commit('setUsuario',{email:res.user.email, uid: res.user.uid})
          router.push({name: 'home'})
        })
        .catch(err=>{
          console.log(err);
          commit('setError', err.message)
        })
    },
    async setUsuario({ commit }, user) {

      try {
        const doc = await db.collection('usuarios').doc(user.uid).get()
        if (doc.exists) {
          commit('nuevoUsuario', doc.data())
        } else {
          const usuario = {
            nombre: user.displayName,
            email: user.email,
            uid: user.uid,
            foto: user.photoURL,
            sucursal: user.sucursal
          }
          await db.collection('usuarios').doc(usuario.uid).set(
            usuario
          )
          console.log('Usuario guardado en DB');
          commit('nuevoUsuario', usuario)
        }

      } catch (error) {
        console.log(error);
      }
    },
    cerrarSesion({ commit }) {
      auth.signOut()
      commit('nuevoUsuario', null)
      router.push({ name: 'ingreso' })
    },
    /* Camion*/
    editarTarea({ commit }, tarea) {
      db.collection('Camiones').doc(tarea.id).update({
        placas: tarea.placas,
        nivTractor: tarea.nivTractor,
        remolque1: tarea.remolque1,
        niv1: tarea.niv1,
        remolque2: tarea.remolque2,
        niv2: tarea.niv2,
        dolly: tarea.dolly,
        utransporte: tarea.utransporte
      })
        .then(() => {
          //router.push({name: 'camion'})
        })
      console.log(tarea.placas);
    },
    deleteTarea({ commit }, tarea) {
      db.collection('FichaRegistro').doc(tarea.id).update({

        estatus: '0'
       
      })
        .then(() => {
        //  router.push({name: 'camion'})
        })
      console.log(tarea.placas);
    },
    agregarTarea({ commit }, payload) {
      db.collection("Camiones").add({
        placas: payload.placas,
        nivTractor: payload.nivTractor,
        remolque1: payload.remolque1,
        niv1: payload.niv1,
        remolque2: payload.remolque2,
        niv2: payload.niv2,
        dolly: payload.dolly,
        utransporte: payload.utransporte,
        estatus: '1'

      })
        .then(doc => {
          console.log(doc.id);
          // router.push({ name: 'inicio' })
        })
    },   
    getTareas({ commit }) {
      const tareas = []
      const camion1 = []
      db.collection('FichaRegistro').where("estatus", "==", '1')
      .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            // console.log(doc.id);
            // console.log(doc.data());
            let tarea = doc.data();
            tarea.id = doc.id
            tareas.push(tarea)
            camion1.push(tarea.placas)
          })
        })
      commit('setTareas', tareas)
      commit('setCamiones', camion1)
    },
    getTarea({ commit }, id) {
      db.collection('FichaRegistro').doc(id).get()
        .then(doc => {
          // console.log(doc.data());
          // console.log(doc.id);
          let tarea = doc.data();
          tarea.id = doc.id
          commit('setTarea', tarea)
        })
    },

    /*Chofer */
    agregarChofer({ commit }, payload) {
      db.collection("Choferes").add({
        nombre: payload.nombre,
        paterno: payload.paterno,
        materno: payload.materno,
        licencia: payload.licencia,
        direccion: payload.direccion,
        telefono: payload.telefono,
        correo: payload.correo,
        evidencia: payload.evidencia,
        estatus: '1'

      })
        .then(doc => {
          console.log(doc.id);
          // router.push({ name: 'inicio' })
        })
    },  
    editarChofer({ commit }, chof) {
      db.collection('Choferes').doc(chof.id).update({
        nombre: chof.nombre,
        paterno: chof.paterno,
        materno: chof.materno,
        licencia: chof.licencia,
        direccion: chof.direccion,
        telefono: chof.telefono,
        correo: chof.correo,
        evidencia: chof.evidencia,
      })
        .then(() => {
          //router.push({name: 'camion'})
        })
      console.log(chof.nombre);
    },
    deleteChofer({ commit }, chof) {
      db.collection('Choferes').doc(chof.id).update({

        estatus: '0'
       
      })
        .then(() => {
        //  router.push({name: 'camion'})
        })
      console.log(chof.nombre);
    },
    
    getChoferes({ commit }) {
      const choferes = []
      const choferes1 = []
      db.collection('FichaRegistro').where("estatus", "==", '1')
      .get()
        .then(snapshot => {
          snapshot.forEach(doc => { 
            let chofer = doc.data();
            chofer.id = doc.id
            choferes.push(chofer)
            choferes1.push(chofer.Placas+'  /  '+chofer.Operador+' /  '+chofer.Tipo)
          })
        })
      commit('setChoferes', choferes),
      commit('setChoferes1', choferes1)
    },
    getChofer({ commit }, id) {
      db.collection('FichaRegistro').doc(id).get()
        .then(doc => {
          let chofer = doc.data();
          chofer.id = doc.id
          commit('setChofer', chofer)
        })
    },


    /* Registro */

    addregistro({ commit }, payload) {
      db.collection("RegistrosEntradas").add({
      
        fecha: payload.date,
        horaEntrada: payload.time,

        chofer: payload.chofer,
        camion: payload.camion, 

        tipo: payload.tipo,
        idChofer:payload.idChofer,
        observaciones:payload.obs,
     
        nombreUsuario:payload.nombreUsuario,
        sucursal:payload.sucursal,
        Estado:"0",

      //  usuario: this.usuario.id,
      })
        .then(doc => {
          console.log(doc.id);
          router.push({ name: 'salida' })
        })
    },
    editarEntrada({ commit }, entra) {
      db.collection('RegistrosEntradas').doc(entra.id).update({
        Estado:"3",
      
      })
        .then(() => {
          //router.push({name: 'camion'})
        })
      console.log(entra.nombre);
    },

    getEntradas({ commit }) {
      const entradas = []
      db.collection('RegistrosEntradas').where("Estado", "==", '0')
      .get()
        .then(snapshot => {
          snapshot.forEach(doc => { 
            let entrada = doc.data();
            entrada.id = doc.id
            entradas.push(entrada)
           })
        })
      commit('setEntradas', entradas)
     },
    getEntrada({ commit }, id) {
      db.collection('RegistrosEntradas').doc(id).get()
        .then(doc => { 
          let entrada = doc.data();
          entrada.id = doc.id
          commit('setEntrada', entrada)
        })
    },
    addFicha({ commit }, payload) {
      db.collection("FichaRegistro").add({
        Operador: payload.operador,
        Telefono: payload.tel,
        Licencia: payload.licencia,
        Identificacion: payload.identificacion,
        Placas: payload.placas,
        Eco: payload.eco,
        Tipo: payload.tipo,
        PRemolque: payload.premolque,
        ERemolque: payload.eremolque,
        PRemolque2: payload.pdremolque,
        ERemolque2: payload.edremolque,
        Dolly: payload.dolly,
        Transporte: payload.transportista,
        TransporteTel: payload.telempresa,
        estatus: "1",

      //  usuario: this.usuario.id,
      })
        .then(doc => {
          console.log(doc.id);
          router.push({name: 'camion'})
       

         // router.push({ name: 'inicio' })
        })
    },
    addSalidas({ commit }, payload) {
      db.collection("RegistroSalidas").add({
        FechaSalida: payload.date,
        HoraSalida: payload.time,
        Total: payload.cuota,
        Usuario: payload.nombreUsuario,
        IDEntrada: payload.id,
        Unidad: payload.tipounidad,
        FechaEntrada: payload.fechaentrada,
        HoraEntrada: payload.horaentrada,
      })
        .then(doc => {
          console.log(doc.id);
          router.push({name: 'salida'})
        })
    },
    getSalidas({commit}) {
      db.collection('RegistrosEntradas').where("Estado", "==", '0')
      .get()

      db.collection('RegistroSalidas').where("FechaEntrada", "==" , '2019-10-01')
      .get()
        .then(snapshot => { 
          snapshot.forEach( doc => {
            console.log(doc.id);
            console.log(doc.data());

          })
        })
    },

  }
})
