import { createContext, useState ,useContext} from 'react';


export const LoginContext = createContext();
export const useLogin= () => useContext(LoginContext)
export const ImageIdProvider = props => {
  const [showModal, setShowModal] = useState(false);


  return (
    <LoginContext.Provider value={{showModal, setShowModal }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
