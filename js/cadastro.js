



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
                entrada: [],
                saida: [],
                alimentaçao: [],
                contas: [],
                entrete: [],
                imprevisto: [],
                outro: [],
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


function entrada() {

    let val = document.getElementById("val").value
    let usuarioD = JSON.parse(window.localStorage.getItem("dados"))
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    let Usuarioindex = Usuario.findIndex(usuario => usuario.id === usuarioD)
    user = Usuarioindex
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
                Usuario[Usuarioindex].entrada.push(val)
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


}
function saida() {
    let tipo = ""
    let tiposaida = document.getElementById("saidaT").value
    let val = document.getElementById("val").value
    let usuarioD = JSON.parse(window.localStorage.getItem("dados"))
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    let Usuarioindex = Usuario.findIndex(usuario => usuario.id === usuarioD)
    user = Usuarioindex


    if (Usuarioindex >= 0) {
        if (val == "") {
            Swal.fire({

                icon: 'warning',
                title: 'Digite um valor',
                showConfirmButton: false,
                timer: 1500
            });

        } else {
            if (tiposaida === "A") {
                Usuario[Usuarioindex].alimentaçao.push(val)
                tipo = "Alimentação"
            }
            else if (tiposaida === "C") {
                Usuario[Usuarioindex].contas.push(val)
                tipo = "Contas Fixas"
            }
            else if (tiposaida === "E") {
                Usuario[Usuarioindex].entrete.push(val)
                tipo = "Entretenimento"
            }
            else if (tiposaida === "I") {
                Usuario[Usuarioindex].imprevisto.push(val)
                tipo = "Imprevistos"
            }
            else {
                Usuario[Usuarioindex].outro.push(val)
                tipo = "Outros"
            }
            Swal.fire({
                title: `Deseja inserir esse Valor de Saída em ${tipo}?`,
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim'
            }).then((result) => {

                Usuario[Usuarioindex].saida.push(val)
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

function listar(user) {
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    let htmlTotal = Usuario[user].totalo
    document.getElementById("entrada").innerHTML = Usuario[user].entrada.length
    document.getElementById("saida").innerHTML = Usuario[user].saida.length
    document.getElementById("total").innerHTML = "R$ " + parseFloat(htmlTotal).toFixed(2)


 listar2(user)
}
function listar2() {
    let Usuario = JSON.parse(window.localStorage.getItem("usuarios"))
    if (Usuario[user].alimentaçao != null) {
        let sair = Usuario[user].alimentaçao
        let linha = "";

        if (Usuario[user].alimentaçao != null) {

            if (sair) {

                for (var x = 0; x < sair.length; x++) {
                    row = document.getElementById("tiposSaidas");
                    if (row != null) {
                        linha += "<div style='border-radius:20px ;' class='card a3 ml-1 mr-1 mt-2 mb-2'>" +
                            "<h4><b>-Alimentação:R$ " + parseFloat(sair[x]).toFixed(2) + "</b></h4>" +
                            "</div>";
                        row.innerHTML = linha;
                    }
                };



            }
        }
    }

            if (Usuario[user].contas != null) {
                let sair = Usuario[user].contas
                let linha = "";

                if (Usuario[user].contas != null) {

                    if (sair) {

                        for (var x = 0; x < sair.length; x++) {
                            row = document.getElementById("tiposSaidas");
                            if (row != null) {
                                linha += "<div style='border-radius:20px ;' class='card a3 ml-1 mr-1 mb-2'>" +
                                    "<h4><b>-Contas Fixas:R$ " + parseFloat(sair[x]).toFixed(2) + "</b></h4>" +
                                    "</div>";
                                row.innerHTML += linha;
                            }
                        }
                    }
                };
            }


        


        if (Usuario[user].entrete != null) {
            let sair = Usuario[user].entrete
            let linha = "";

            if (Usuario[user].entrete != null) {

                if (sair) {

                    for (var x = 0; x < sair.length; x++) {
                        row = document.getElementById("tiposSaidas");
                        if (row != null) {
                            linha += "<div style='border-radius:20px ;' class='card a3 ml-1 mr-1 mb-2'>" +
                                "<h4><b>-Entretenimento:R$ " + parseFloat(sair[x]).toFixed(2) + "</b></h4>" +
                                "</div>";
                            row.innerHTML += linha;
                        }
                    };

                }
            }
        }


            if (Usuario[user].imprevisto != null) {
                let sair = Usuario[user].imprevisto
                let linha = "";

                if (Usuario[user].imprevisto != null) {

                    if (sair) {

                        for (var x = 0; x < sair.length; x++) {
                            row = document.getElementById("tiposSaidas");
                            if (row != null) {
                                linha += "<div style='border-radius:20px ;' class='card a3 ml-1 mr-1 mb-2'>" +
                                    "<h4><b>-Imprevistos:R$ " + parseFloat(sair[x]).toFixed(2) + "</b></h4>" +
                                    "</div>";
                                row.innerHTML += linha;
                            }
                        }
                    };

            
                }
            }
                if (Usuario[user].outro != null) {
                    let sair = Usuario[user].outro
                    let linha = "";

                    if (Usuario[user].outro != null) {

                        if (sair) {

                            for (var x = 0; x < sair.length; x++) {
                                row = document.getElementById("tiposSaidas");
                                if (row != null) {
                                    linha += "<div style='border-radius:20px ;' class='card a3 ml-1 mr-1 mb-2'>" +
                                        "<h4><b>-Outros:R$ " + parseFloat(sair[x]).toFixed(2) + "</b></h4>" +
                                        "</div>";
                                    row.innerHTML += linha;
                                }
                            };
                        }
                    }
                }
            



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


        
            listar(user)
// alerte()
// perfil()
