console.log('JS Test');

const { createApp } = Vue

createApp({
    data() {
        return {
            title: 'Email List:',
            eMails: [],
            numberOfEMails: 10,
        }
    },


    created(){
        this.generateMails(this.numberOfEMails)
    },


    methods: {

        generateMails(n){
            // creazione di un array "temporaneo" in cui verrano salvate delle promesse
            const tempEmails = [];

            // in questo ciclo for stiamo pushando delle promesse (in questo caso della mail casuali), all'interno del nostro array temporaneo
            for(i = 0; i < n; i++){

                // questa costante rappresenta la singola promessa che verrà pushata all'interno del nostro array temporaneo
                // in questo caso gli stiamo assegando come valore quello rappresentato dal dato ricevuto dal server (una mail casuale)
                const promise = axios.get('https://flynn.boolean.careers/exercises/api/random/mail');
                tempEmails.push(promise);
            }

            // con il metodo promise all, possiamo ottenere un array che corrisponde ad una singola promessa, 
            // questo singolo Array ha come elementi che lo compongono le varie promesse a cui facciamo riferimento,
            // in questo caso le promesse che abbiamo salvato all'interno di tempEmails.
            Promise.all(tempEmails).then(serverResponses => {                
                // questo codice qui viene quindi eseguito con tutti dati a nostra disposizione.
                console.log(serverResponses);

                for(i = 0; i < serverResponses.length; i++){

                    this.eMails.push(serverResponses[i].data.response)
                }
            });
        }



        /*  
         // Qui la risoluzione senza uso delle promesse. 
         // In questo caso bisognava aggiungere nell'HTML il componente Vue v-show, 
         // impostando la condizione che lo rendesse visibile solo nel caso la lunghezza di eMails
         // risultasse pari ad una costante corrispondente al numero richiesto (in questo caso 10).

            generateMail(n){
           
                for(i = 0; i < n; i++){
                    axios.get('https://flynn.boolean.careers/exercises/api/random/mail')
                    .then((serverResponse) => {
                        let mail = serverResponse.data.response
                        this.eMails.push(mail) 

                    })
                }
            }
        */

            
                
    },
}).mount('#app')