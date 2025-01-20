const animales = ["Lion", "Cow", "Snake", "Lizard"];

const Animal = animales.map((a, i) =>
    <li key={"animal_" + i}>{a}</li>
)

function Zoo() {
    return <ol>{Animal}</ol>
}


export default Zoo