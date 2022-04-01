

const searchProduct = (keyword) =>{

    fetch(`${process.env.REACT_APP_API_URL}/products/q/${keyword}`)
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        return data
      }
    }); 
}


module.exports ={
    searchProduct,
}