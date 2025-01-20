export default function Promesa() {
    let prueba = fetch("https://api.frankfurter.dev/v1/latest?base=USD")
    prueba.then((res) => res.json() )
    
}