let listArs = [];

//Enlace para ver datos guardados en sheet:
//https://docs.google.com/spreadsheets/d/1Yg6Ae23Lq2i8eVDwU0sv7GTkKnBBjvmo7DlFDy8g-m8/edit#gid=0

//ready
$(()=>{
    console.log(("DOM listo para procesar"));

    //botón procesar a través de Jquery
    $('#btnProcesar').on('click', ()=>{
        const pGlosasSa = document.querySelector('#glosasSa').value,
            pGlosasSe = document.querySelector('#glosasSe').value,
            pRetirosFallidos = document.querySelector('#retirosFallidos').value,
            pSaldoAdmin = document.querySelector('#saldoAdmin').value,
            pSaldoBanco = document.querySelector('#saldoBanco').value,
            pSumaTotal = parseFloat(pGlosasSa) + parseFloat(pGlosasSe) + parseFloat(pRetirosFallidos) + parseFloat(pSaldoAdmin),
            pDiferenciaBruta = (pSumaTotal - pSaldoBanco).toFixed(2);

        console.log("El resumen del cierre ARS es:" 
            +"\nAbonos sin asociar: $ " + pGlosasSa
            + "\nAbonos retenidos: $ " + pGlosasSe
            + "\nComisiones pendientes: $ " + pRetirosFallidos
            + "\nSaldo en Admin: $ " + pSaldoAdmin
            + "\nSaldo en Banco: $ " + pSaldoBanco
            + "\nTotal diferencia bruta: $ " + pDiferenciaBruta);

        saveClose(pGlosasSa, pGlosasSe, pRetirosFallidos, pSaldoAdmin, pSaldoBanco, pDiferenciaBruta);


        $('#datosResultado').addClass('activo');
        $('#formularioN').removeClass('activo');

        viewElementsList();
    });


        function saveClose(glosasSa, glosasSe, retirosFallidos, saldoAdmin, saldoBanco, difrenciBruta){
            let newClose = {
                abonos :("$" + glosasSa),
                retenidos : ("$" + glosasSe),
                comisiones : ("$" + retirosFallidos),
                admin : ("$" + saldoAdmin),
                banco : ("$" + saldoBanco),
                diferencia : ("$" + difrenciBruta)
            };
            console.log(newClose);
            listArs.push(newClose);
            localStorageListArs(listArs);
        }
          function localStorageListArs(listOne){
            sessionStorage.setItem('savedLocal', JSON.stringify(listOne));
        }


    //Botón guardar
    $('#btnGuardar').on('click', async(e)=>{
    const formulario = document.getElementById('form');
    e.preventDefault();
    console.log("localStorageListArs");
    

    localStorage.setItem('savedLocal', JSON.stringify(listArs));

    await fetch('https://sheet.best/api/sheets/c26ce650-f857-48f2-a199-21c37a4d8870', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "Abonos sin asociar Ars": bGlosasSa = document.querySelector('#glosasSa').value,
            "Abonos retenidos": bGlosasSe = document.querySelector('#glosasSe').value,
            "Comisones Pendientes": bRetirosFallidos = document.querySelector('#retirosFallidos').value,
            "Saldo Admin": bSaldoAdmin = document.querySelector('#saldoAdmin').value,
            "Saldo en banco": bSaldoBanco = document.querySelector('#saldoBanco').value,
            "Diferencia Bruta Ars": bSumaTotal = parseFloat(bGlosasSa) + parseFloat(bGlosasSe) + parseFloat(bRetirosFallidos) + parseFloat(bSaldoAdmin)-bSaldoBanco
        })
    })

    alert("Guardado exitoso");
})


    $('#btnVolver').on('click', ()=>{
                console.log("presionaste volver");

                formularioN.classList.add('activo');
                datosResultado.classList.remove('activo');
            })
            
        function getDateNewClose(){
            var storageClose = sessionStorage.getItem('savedLocal');
            if(storageClose == null){
                listArs = [];
            }else{
                listArs = JSON.parse(storageClose);
            }
            return listArs;
        }


    function viewElementsList(){
            let list = getDateNewClose();
                tbody = document.querySelector('#summaryTable tbody');
                tbody.innerHTML = '';
           for(let i = 0; i < list.length; i++) {
                let rows = tbody.insertRow(i);
                    abonosCell = rows.insertCell(0),
                    retenidosCell = rows.insertCell(1),
                    comisionesCell = rows.insertCell(2),
                    adminCell = rows.insertCell(3),
                    bancoCell = rows.insertCell(4),
                    diferenciaCell = rows.insertCell(5)
    
                    abonosCell.innerHTML = list[i].abonos;
                    retenidosCell.innerHTML = list[i].retenidos;
                    comisionesCell.innerHTML = list[i].comisiones;
                    adminCell.innerHTML = list[i].admin;
                    bancoCell.innerHTML = list[i].banco;
                    diferenciaCell.innerHTML = list[i].diferencia;
            tbody.appendChild(rows);
            }
        }

});