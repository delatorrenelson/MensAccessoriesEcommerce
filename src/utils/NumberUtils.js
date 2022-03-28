const formatNumber = (n) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(n);
    //   retun nf.format(n);       
}

module.exports = {
    formatNumber
}