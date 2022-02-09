import { createContext, useContext, useState, memo } from 'react'

const Context = createContext()

const ContadorProvider = ({ children }) => {
    const [contador, setContador] = useState(0)

    const incrementar = () => setContador(contador + 1)
    const decrementar = () => setContador(contador - 1)

    return(
        <Context.Provider value={{ contador, incrementar, decrementar }}>
            {children}
        </Context.Provider>
    )
}

// MEMO NO FUNCIONA AQUI. Cada vez que se modifique el contexto se re renderizaran 
// los componentes que lo usen
// USAREMOS CONTEXT EN CASOS COMO: Almacenar usuario, idiomas, keys... ç
// u otros daots que no cambien amenudo
const Incrementar = memo(() => {
    console.log("incrementar")
    const { incrementar } =  useContext(Context)
    return (
        <button onClick={incrementar}>Incrementar</button>
    ) 
})

const Decrementar = memo(() => {
    console.log("decrementar")
    const { decrementar } =  useContext(Context)
    return (
        <button onClick={decrementar}>Decrementar</button>
    ) 
})

const Label = () => {
    console.log("label")
    const { contador } = useContext(Context)
    return(
        <h1>{contador}</h1>
    )
}

const App = () => {
    return (
        <ContadorProvider>
            <Label />
            <Incrementar />
            <Decrementar />
        </ContadorProvider>
    )
}

export default App