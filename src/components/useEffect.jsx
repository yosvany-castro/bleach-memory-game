const alimento = "Comida"


export const Manolito = () => {
    function suma(a) {
        return a + 10
    }
    const Devolver = ({lugar}) => {
        return <li>{alimento + " " + lugar}</li>
    }
    return (
        <ul>
            <li>{suma(20)}</li>
            <Devolver lugar={"Habana"}/>
        </ul>
    )
}
