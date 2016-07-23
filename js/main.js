requirejs.config({
    baseUrl:'',
    paths:{
        'jquery':'js/jquery-3.0.0.min'
    }
});
require(['js/boxMove','js/script1','js/script2'],function(B, S1, S2){
    console.log(B);
    console.log(S1);
    console.log(S2);
   // new S2;
});