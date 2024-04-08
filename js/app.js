console.log('JS Test');

const { createApp } = Vue

createApp({
    data() {
        return {
            title: 'Email List:',
            eMails: [],
        }
    },


    created(){
        this.generateMail(30)
    },


    methods: {

        generateMail(n){
           
            for(i = 0; i < n; i++){
                axios.get('https://flynn.boolean.careers/exercises/api/random/mail')
                .then((serverResponse) => {
                    let mail = serverResponse.data.response
                    this.eMails.push(mail) 

                })
            }
        }
    },
}).mount('#app')