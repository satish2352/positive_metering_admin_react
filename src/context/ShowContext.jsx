

// context created for passing title

// import { createContext, useState } from "react"

// const ShowContext = createContext()

// const ShowStatus = ({ children }) => {
//     const [shows, setShows] = useState(false)
    
//     return (
//         <ShowContext.Provider value={{ shows, setShows }}>
//             {children}
//         </ShowContext.Provider>
//     )
// }

// export { ShowStatus, ShowContext }

//t1
import { createContext, useState } from "react"

const ShowContext = createContext()

const ShowStatus = ({ children }) => {
    const [shows, setShows] = useState(false)
    const toggleShows = () => setShows(prevState => !prevState)
    return (
        <ShowContext.Provider value={{ shows, toggleShows }}>
            {children}
        </ShowContext.Provider>
    )
}

export { ShowStatus, ShowContext }