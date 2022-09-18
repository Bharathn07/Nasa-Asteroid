import React, { useState, createContext } from "react";

const AstroidInfoContext = createContext<any|null>(null);

const AstroidInfoProvider = ({children}:any)=>{
    const [astroidInfo, setAstroidInfo] = useState({
        name: '',
        nasa_jpl_url: '',
        is_potentially_hazardous_asteroid: false
    })
    return(
        <AstroidInfoContext.Provider value={{astroidInfo, setAstroidInfo}}>
            {children}
        </AstroidInfoContext.Provider>
    )
};

export {AstroidInfoContext, AstroidInfoProvider}