import { createContext, useState ,useContext} from 'react';


export const ShowModelContext = createContext();
export const useShowModel = () => useContext(ShowModelContext)
export const ShowModelProvider = props => {
    const [showModal, setShowModal] = useState(false);


  return (
    <ShowModelContext.Provider value={{showModal, setShowModal }}>
      {props.children}
    </ShowModelContext.Provider>
  );
};

export default ShowModelContext;
