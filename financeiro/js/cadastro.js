



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
                entradaesaida: [],
              
                categorias:[],
                contas:[],
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
            if (emaillocaS[emailindex2].status === "Ativo") {
                const Toast = Swal.mixin({
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

let user = 0
usuario()
function usuario() {
    let Dados = JSON.parse(window.localStorage.getItem("dados"))
    let usuarios = JSON.parse(window.localStorage.getItem("usuarios"))
    user = usuarios.findIndex(usuario => usuario.id === Dados)

}
let padrao=0
let total=0
let total1=0
function tipo(){
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    let Despesasereceitas=Usuario[user].entradaesaida
    let conta=Usuario[user].contas
    


    
        for(x in Despesasereceitas ){
     
            if(Despesasereceitas[x].conta==conta[padrao].nome){
                if( conta[padrao].tipo=="Receita"){
                    total+=parseInt(Despesasereceitas[x].valor)
                    document.getElementById("Receitas").innerHTML="R$"+parseFloat(total).toFixed(2)
                }
                else{
                    total1+=parseInt(Despesasereceitas[x].valor)
                    document.getElementById("Despesas").innerHTML="R$"+parseFloat(total1).toFixed(2)
                }
             
            }
        }
        console.log(total1,total)
        padrao+=1
      
        if(padrao<=Despesasereceitas.length ){
            tipo()
          

        }
       
    
}


function listar(user) {
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    let htmlTotal = Usuario[user].totalo
   
    


    
    
  
    

    
   document.getElementById("total").innerHTML="R$"+parseFloat(htmlTotal).toFixed(2)
   tipo()
//    document.getElementById("Despesas").innerHTML="R$"+parseFloat(Usuario[user].saida[leng-1].total).toFixed(2)
//    document.getElementById("Receitas").innerHTML="R$"+parseFloat(htmlTotal+Usuario[user].saida[leng-1].total).toFixed(2)
    


    
}



function alerte() {
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    let usuarioA = JSON.parse(window.localStorage.getItem("dados"))

    let Usuariofind = Usuario.findIndex(usuario => usuario.id === usuarioA)

    if (Usuario[Usuariofind].totalo < 0) {
        Swal.fire({

            icon: 'warning',
            title: 'Seu saldo esta negativo!',
            showConfirmButton: false,
            timer: 1500
        });
        document.getElementById("alertar").innerHTML = "Saldo Negativo!"
    }
    else {
        document.getElementById("alertar").innerHTML = ""

    }
}


function categoria(){
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    let usuarioA = JSON.parse(window.localStorage.getItem("dados"))

    let Usuariofind = Usuario.findIndex(usuario => usuario.id === usuarioA)
    
    Usuario[Usuariofind].categorias.push({
        nome:document.getElementById("nomecategoria").value,
        id:Date.now()
    })
    window.localStorage.setItem("usuarios", JSON.stringify(Usuario))
    document.getElementById("nomecategoria").value=""
listaC()
}

function listarcategoriaeconta(){
    let linha=""
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    let usuarioA = JSON.parse(window.localStorage.getItem("dados"))

    let Usuariofind = Usuario.findIndex(usuario => usuario.id === usuarioA)
    let categoriagravado=Usuario[Usuariofind].categorias
    if(categoriagravado){
        categoriagravado.forEach(categorias=>{
            row=document.getElementById("saidaT")
            if(row !=null){
                linha+="<option value="+categorias.id+">"+categorias.nome+"</option>"
                row.innerHTML=linha
            }

        })
       
    }
    let contagravado=Usuario[Usuariofind].contas
    if(contagravado){
        contagravado.forEach(contas=>{
            row=document.getElementById("lancamentos")
            if(row !=null){
                linha+="<option value="+contas.categoria+">"+contas.nome+"</option>"
                row.innerHTML=linha
            }

        })
       
    }
    
}

function listarcontas(){
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    let usuarioA = JSON.parse(window.localStorage.getItem("dados"))
    let Usuariofind = Usuario.findIndex(usuario => usuario.id === usuarioA)
    let nome=document.getElementById("nome").value
    let tipo=document.getElementById("tipos").value
    let categoria=document.getElementById("saidaT").value
    let categoriagravado=Usuario[Usuariofind].categorias
    let catefind=categoriagravado.findIndex(categoriA=>categoriA.id==categoria)

    
     
    Usuario[Usuariofind].contas.push({
        nome:nome,
        tipo:tipo,
        categoria:categoriagravado[catefind].nome
    })
    window.localStorage.setItem("usuarios",JSON.stringify(Usuario))

document.getElementById("nome").value=""
listartabelacontas()

}
function lancamentos() {
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    let usuarioA = JSON.parse(window.localStorage.getItem("dados"))
    let Usuariofind = Usuario.findIndex(usuario => usuario.id === usuarioA)
    let valor=document.getElementById("valor").value
    let tipoconta=document.getElementById("lancamentos").value
    debugger
    let contagravado=Usuario[Usuariofind].contas
   let contafind=contagravado.findIndex(contas=>contas.categoria===tipoconta)
 let Conta=contagravado[contafind].tipo




var select = document.querySelector('select');
var option = select.children[select.selectedIndex];
var texto = option.textContent;
var data = new Date();
var dia     = data.getDate();  
var mes     = data.getMonth()+parseInt(1); 
var ano4    = data.getFullYear();
 
Usuario[Usuariofind].entradaesaida.push(
    {
        conta:texto,
        valor:valor,
        data:dia+"/"+mes+"/"+ano4


    }   )


 
  
  if(Conta==="Receita"){
      
    Usuario[Usuariofind].totalo+=parseInt(valor)
       }
       else{
        Usuario[Usuariofind].totalo-=parseInt(valor)
            
        }
        
       window.localStorage.setItem("usuarios",JSON.stringify(Usuario))
       document.getElementById("valor").value=""
       listartabelacontas()
}
function listartabelacontas(){
    let linha = "";
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    let usuarioA = JSON.parse(window.localStorage.getItem("dados"))
    let Usuariofind = Usuario.findIndex(usuario => usuario.id === usuarioA)
    let contagravado=Usuario[Usuariofind].contas
    let categoriagravado=Usuario[Usuariofind].categorias
  
    if(contagravado){ 
        
        contagravado.forEach(contas => {
         row = document.getElementById("bd");
         
         let catfind=categoriagravado.findIndex(cate=>cate.nome===contas.categoria)
         let id=0
         if(catfind>-1){ 
              id=categoriagravado[catfind].id
        }
         else{
            //  alert("essa categoria nao existe")
             id= null
         }
       
         if(row != null){
          linha += "<tr>"+
          "<td id='tdnome'>"+contas.nome +"</td>"+
          "<td id='tdnome'>"+contas.tipo +"</td>"+
          "<td id='tdnome'>"+contas.categoria +"</td>"+
          "<td id='tdacoes'><button class='btn btn-outline-success' onclick='editarcontas("+id+")'><i class='fa fa-edit'></i></button>"+
          "<button class='btn btn-outline-danger'onclick='apagarUsuario("+id+")'><i class='mt -2 fa fa-trash'></i></button></td>"
             "</tr>";
         row.innerHTML = linha;        
         }   
       });
      
       
       }
     
      
       let entradagravado=Usuario[Usuariofind].entradaesaida
       if(entradagravado){ 
        entradagravado.forEach(entradaesaida => {
         row = document.getElementById("bad");
         if(row != null){
          linha += "<tr>"+
          "<td id='tdnome'>"+entradaesaida.conta +"</td>"+
          "<td id='tdnome'>"+entradaesaida.valor +"</td>"+
          "<td id='tdnome'>"+entradaesaida.data+"</td>"+
          "<td id='tdacoes'><button class='btn btn-outline-success' onclick='editarvalores("+entradaesaida.valor+")'><i class='fa fa-edit'></i></button>"+
          "<button class='btn btn-outline-danger'onclick='apagarUsuario("+entradaesaida.valor+")'><i class='mt -2 fa fa-trash'></i></button></td>"
             "</tr>";
         row.innerHTML = linha;        
         }   
       });
      
       
       }
 
    
     

 
    

   
 
  
}
function listaC(){
    
    let linha = "";
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    let usuarioA = JSON.parse(window.localStorage.getItem("dados"))
    let Usuariofind = Usuario.findIndex(usuario => usuario.id === usuarioA)
    let categravado=Usuario[Usuariofind].categorias
    
  
   
     
      
       
       if( categravado){ 
        categravado.forEach(categoria => {
         row = document.getElementById("cat");
         if(row != null){
          linha += "<tr>"+
          "<td id='tdnome'>"+categoria.nome +"</td>"+
          "<td id='tdacoes'><button class='btn btn-outline-success' onclick='editarUsuarioC("+categoria.id+")'><i class='fa fa-edit'></i></button>"+
          "<button class='btn btn-outline-danger'onclick='apagarUsuario("+categoria.id+")'><i class='mt -2 fa fa-trash'></i></button></td>"
         
             "</tr>";
         row.innerHTML = linha;        
         }   
       });
      
       
       }

}

function editarUsuarioC(id){
    document.getElementById("btn").disabled=false
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    let usuarioA = JSON.parse(window.localStorage.getItem("dados"))
    let Usuariofind = Usuario.findIndex(usuario => usuario.id === usuarioA)
    let categravado=Usuario[Usuariofind].categorias
categorianome=categravado.findIndex(categoriA=>categoriA.id===id)

let valor=categravado[categorianome].nome
    
    document.getElementById("nomecategoria").value=valor
    window.localStorage.setItem("id",JSON.stringify(id))

}

 function alterar(){
     let idlocal=JSON.parse(window.localStorage.getItem("id"))
     let nome=document.getElementById("nomecategoria").value
     let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
     let usuarioA = JSON.parse(window.localStorage.getItem("dados"))
     let Usuariofind = Usuario.findIndex(usuario => usuario.id === usuarioA)
     let categravado=Usuario[Usuariofind].categorias
     let categorianome=categravado.findIndex(categoriA=>categoriA.id===idlocal)
   
   let id =categravado[categorianome].id
   
 
  
    // como fazer para atualiza a posicao do array
   categravado[categorianome] = {nome,id}
   window.localStorage.setItem("usuarios",JSON.stringify(Usuario))
   document.getElementById("btn").disabled=true
   listaC()
 }

 function editarcontas(id){
     if(id===null){
         alert("essa categoria n existe")
     }
    // document.getElementById("btn").disabled=false
  
    
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    let usuarioA = JSON.parse(window.localStorage.getItem("dados"))
    let Usuariofind = Usuario.findIndex(usuario => usuario.id === usuarioA)
    let categravado=Usuario[Usuariofind].categorias
    let catefind=categravado.findIndex(categoria=>categoria.id===id)
    let nome=categravado[catefind].nome
   let contagravado=Usuario[Usuariofind].contas
   let  contafind=contagravado.findIndex(conta=>conta.categoria===nome)
   
 let valor=contagravado[contafind].tipo
    console.log(valor)
    document.getElementById("saidaT").value=id
    document.getElementById("tipos").value=valor
    document.getElementById("nome").value=contagravado[contafind].nome

     window.localStorage.setItem("nome",JSON.stringify(contagravado[contafind].nome))
     

 }
function alterarC(){
    let idlocal=JSON.parse(window.localStorage.getItem("nome"))
     let nome=document.getElementById("nome").value
     let categoria=document.getElementById("saidaT").value
     let tipo=document.getElementById("tipos").value
     let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
     let usuarioA = JSON.parse(window.localStorage.getItem("dados"))
     let Usuariofind = Usuario.findIndex(usuario => usuario.id === usuarioA)
     let categoriagravado=Usuario[Usuariofind].categorias
     let catefind=categoriagravado.findIndex(categoriA=>categoriA.id==categoria)
 
    
     


     let congravado=Usuario[Usuariofind].contas
     let contafind=congravado.findIndex(categoriA=>categoriA.nome===idlocal)
   
   
     congravado[contafind]={nome,tipo,categoria:categoriagravado[catefind].nome}
   
 console.log(Usuario)
  
    // como fazer para atualiza a posicao do array

   window.localStorage.setItem("usuarios",JSON.stringify(Usuario))
//    document.getElementById("btn").disabled=true
listartabelacontas()

}

    function editarvalores(valor){
        
     let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
     let usuarioA = JSON.parse(window.localStorage.getItem("dados"))
     let Usuariofind = Usuario.findIndex(usuario => usuario.id === usuarioA)
     let entradasaida=Usuario[Usuariofind].entradaesaida
     let catefind=entradasaida.findIndex(categoriA=>categoriA.valor==valor)
     let es=entradasaida[catefind]

  
document.getElementById("valor").value=es.valor
document.getElementById("lancamentos").value=es.conta

    //  let congravado=Usuario[Usuariofind].contas
    //  let contafind=congravado.findIndex(categoriA=>categoriA.nome===idlocal)
   
   
    
   
    window.localStorage.setItem("valor",JSON.stringify(valor))
  
    // como fazer para atualiza a posicao do array

   
    }
        function AlterarE(){ let idlocal=JSON.parse(window.localStorage.getItem("valor"))
     let valor=document.getElementById("valor").value
     let lancamentos=document.getElementById("lancamentos").value
     
     let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
     let usuarioA = JSON.parse(window.localStorage.getItem("dados"))
     let Usuariofind = Usuario.findIndex(usuario => usuario.id === usuarioA)
     let entradasaida=Usuario[Usuariofind].entradaesaida
     let catefind=entradasaida.findIndex(categoriA=>categoriA.valor==idlocal)
     let es=entradasaida[catefind]
     var data = new Date();
var dia     = data.getDate();  
var mes     = data.getMonth()+parseInt(1); 
var ano4    = data.getFullYear();
 

console.log(lancamentos)


     entradasaida[catefind]={lancamentos,valor, data:dia+"/"+mes+"/"+ano4}
    
     


     let congravado=Usuario[Usuariofind].contas
     let contafind=congravado.findIndex(categoriA=>categoriA.nome===idlocal)
   
   
   
   
 alert(lancamentos)
  
    // como fazer para atualiza a posicao do array

   window.localStorage.setItem("usuarios",JSON.stringify(Usuario))
//    document.getElementById("btn").disabled=true
listartabelacontas()

}
       



//   function perfil(user){

//     let usuarios = JSON.parse(window.localStorage.getItem("usuarios"))

//      console.log(usuarios[user].nome)
//      if(usuarios[user].nome!=null){
//            document.getElementById("nome").value=usuarios[user].nome
//     document.getElementById("email").value=usuarios[user].email
//     document.getElementById("telefone").value=usuarios[user].telefone
//     document.getElementById("cep").value=usuarios[user].cep
//     document.getElementById("status").value=usuarios[user].status
//     document.getElementById("senha").value=usuarios[user].senha
//     }



//  }

listartabelacontas()
listarcategoriaeconta()
listaC()
listar(user)
alerte()

// perfil()
