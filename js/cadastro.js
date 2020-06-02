



function cadastrar() {
    if (document.getElementById("nome").value == "" || document.getElementById("email").value == "" || document.getElementById("telefone").value == ""
        || document.getElementById("cep").value == "" || document.getElementById("senha").value == "") {

        Swal.fire({

            icon: 'warning',
            title: 'Preencha Todos os Campos',
            showConfirmButton: false,
            timer: 1500
        });
    }
    else {

        let emailhtml = document.getElementById("email").value
        let emailstorage = JSON.parse(window.localStorage.getItem("usuarios"))
        let emailindex = emailstorage.findIndex(usuario => usuario.email === emailhtml)
      
        if (emailindex >= 0) {
            Swal.fire({

                icon: 'warning',
                title: 'Este e-mail já está Cadastrado',
                showConfirmButton: false,
                timer: 1500
            });
            document.getElementById("email").value = ""
        } else {
            const usuario = {
                nome: document.getElementById("nome").value,
                email: document.getElementById("email").value,
                telefone: document.getElementById("telefone").value,
                cep: document.getElementById("cep").value,
                status: "Ativo",
                senha: document.getElementById("senha").value,
                entrada: 0,
                saida: 0,
                totalo: 0,
                id: Date.now()
            }

            let usuarios = JSON.parse(window.localStorage.getItem("usuarios"))
            if (usuarios == null) {
                window.localStorage.setItem('usuarios', JSON.stringify([]))
                usuarios = JSON.parse(window.localStorage.getItem("usuarios"))
                usuarios.push(usuario)
                window.localStorage.setItem("usuarios", JSON.stringify(usuarios))
            }
            else {

                usuarios.push(usuario)
                window.localStorage.setItem("usuarios", JSON.stringify(usuarios))
            }
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: `Usuário Cadastrado`
            });
            setInterval(function () {
                window.location.href = "login.html";
            }), 4500;




        }





    }



}

function login() {
    let emailpagina = document.getElementById("email").value
    let emaillocaS = JSON.parse(window.localStorage.getItem("usuarios"))
    let emailindex2 = emaillocaS.findIndex(usuario => usuario.email === emailpagina)
    if (emailindex2 >= 0) {
        let senhapagina = document.getElementById("senha").value
        if (emaillocaS[emailindex2].senha === senhapagina) {
            if(emaillocaS[emailindex2].status==="Ativo"){const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 900,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: `Bem vindo ${emaillocaS[emailindex2].nome}`
            });
            setInterval(function () {
                window.location.href = "painel.html";
            }), 900;
            document.getElementById("email").value = ""
            window.localStorage.setItem('dados', JSON.stringify(emaillocaS[emailindex2].id))
        }
            
           


        } else {
            Swal.fire({

                icon: 'warning',
                title: 'Senha incorreta',
                showConfirmButton: false,
                timer: 1500
            });
            document.getElementById("senha").value = ""

        }
    } else {
        Swal.fire({

            icon: 'warning',
            title: 'Email incorreto',
            showConfirmButton: false,
            timer: 1500
        });
        document.getElementById("email").value = ""

    }





}

let user=0
usuario()
function usuario(){
    let  Dados=JSON.parse(window.localStorage.getItem("dados"))
   let usuarios = JSON.parse(window.localStorage.getItem("usuarios"))
      user=usuarios.findIndex(usuario=>usuario.id===Dados)
    
  }
  

function entrada() {

    let val = document.getElementById("val").value
    let usuarioD = JSON.parse(window.localStorage.getItem("dados"))
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    let Usuarioindex = Usuario.findIndex(usuario => usuario.id === usuarioD)
     user=Usuarioindex
    if (Usuarioindex >= 0) {
        if (val == "") {
            Swal.fire({

                icon: 'warning',
                title: 'Digite um valor',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                title: 'Deseja inserir esse Valor de Entrada?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim'
            }).then((result) => {
                Usuario[Usuarioindex].entrada += parseInt(val)
                Usuario[Usuarioindex].totalo += parseInt(val)
                window.localStorage.setItem("usuarios", JSON.stringify(Usuario))
                

                if (result.value) {
                  
                   
                    Swal.fire(
                        'Valor Inserido!',
                        document.getElementById("val").value = "",
                        alerte(),
                        listar(user)
                        
                        
                    )
                }
            })
           

        }
    }
    
    // alerte()
}
function saida() {
   
    let val = document.getElementById("val").value
    let usuarioD = JSON.parse(window.localStorage.getItem("dados"))
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    let Usuarioindex = Usuario.findIndex(usuario => usuario.id === usuarioD)
     user=Usuarioindex
    if (Usuarioindex >= 0) {
        if (val == "") {
            Swal.fire({

                icon: 'warning',
                title: 'Digite um valor',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                title: 'Deseja inserir esse Valor de Saída?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim'
            }).then((result) => {
                Usuario[Usuarioindex].entrada -= parseInt(val)
                Usuario[Usuarioindex].totalo -= parseInt(val)
                window.localStorage.setItem("usuarios", JSON.stringify(Usuario))
                

                if (result.value) {
                  
                    debugger
                    Swal.fire(
                        'Valor Atualizado!',
                        document.getElementById("val").value = "",
                 
                        alerte(),
                        listar(user)
                    
                        
                    )
                }
            })
           
              
        }
        
    }
   
    
}

function listar(user){
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    let htmlTotal=Usuario[user].totalo
    
    

    document.getElementById("total").innerHTML="R$ "+parseFloat(htmlTotal).toFixed(2)
   
}
function alerte(){
  let  Usuario=JSON.parse(window.localStorage.getItem("usuarios"))
  let usuarioA = JSON.parse(window.localStorage.getItem("dados"))  
   
  let Usuariofind=Usuario.findIndex(usuario=>usuario.id===usuarioA)
 
  if(Usuario[Usuariofind].totalo<0){
    Swal.fire({

        icon: 'warning',
        title: 'Seu saldo esta negativo!',
        showConfirmButton: false,
        timer: 1500
    });
    document.getElementById("alertar").innerHTML="Saldo Negativo!"
}else{
    document.getElementById("alertar").innerHTML=""

}



  }

//   function perfil(){
//     let  Dados=JSON.parse(window.localStorage.getItem("dados"))
//     let usuarios = JSON.parse(window.localStorage.getItem("usuarios"))
    
     
//     // document.getElementById("nome").value=usuarios[i].nome
//     // document.getElementById("email").value=usuarios[i].email
//     // document.getElementById("telefone").value=usuarios[i].telefone
//     // document.getElementById("cep").value=usuarios[i].cep
//     // document.getElementById("status").value=usuarios[i].status
//     // document.getElementById("senha").value=usuarios[i].senha
    
//     for(let i =0; i< usuarios.length; i++){
//         if(usuarios[i].id == Dados){
//             alert( usuarios[i].nome)
//         document.getElementById("nome").value =  usuarios[i].nome;
//         document.getElementById("email").value =  usuarios[i].email;
//          document.getElementById("telefone").value = usuarios[i].telefone;
//           document.getElementById("cep").value =  usuarios[i].cep;
//          document.getElementById("status").value =  usuarios[i].status;
//         document.getElementById("senha").value =  usuarios[i].senha;
        
//         }
//       }
//  }


//  perfil()
listar(user)
alerte()

