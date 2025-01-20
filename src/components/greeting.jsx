function Saludar() {
    return (
        <>
            <h2>Quiero ser un profesor Excelente</h2>
            <p>Eso dicen de mi</p>
        </>
    )
}

const Name = "Yosvany"

const SayName = () => {
    return <h3>Mi nombre es {Name}</h3>
}

export default Name;

export {Saludar, SayName}