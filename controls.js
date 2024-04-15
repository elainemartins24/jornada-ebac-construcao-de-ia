//Será utilizado para o Javascript colocar os controles que já 
//existem no navegador na IA que está sendo criada, como pular por exemplo. 

export default{
    //Pulo - Define-se a tecla  para a ação de pular
    jump: new KeyboardEvent('keydow', {key: 'space', keycode: 32}),
    //Agachar
    dispatch(event){
        document.dispatchEvent(this[event]);
    }
}