// // import products from "../../../productsdata"
// export const getProducts = ()=> async(dispatch)=>{
//     const url = "https://amazon-mern-backend.onrender.com"
//     try {
//         // console.log("fetching datas")
//         const data = await fetch(url+"/getproducts",{
//                 method:"GET",
//                 headers:{
//                     "Content-Type":"application/json"
//                 }
//         });
//         // console.log(data);
//         const res = await data.json();
//         // console.log("this is response",res);
//         // if(!res){
//         //     res = products
//         // }
      
//         dispatch({type:"SUCCESS_GET_PRODUCTS",payload:res});
//     } catch (error) {
//         dispatch({type:"FAIL_GET_PRODUCTS",payload:error.response});
//     }
// }