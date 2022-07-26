import { createContext, useState ,useContext} from 'react';


export const ImageIdContext = createContext();
export const useImageId = () => useContext(ImageIdContext)
export const ImageIdProvider = props => {
    const [ImageId, setImageId] = useState(-1);


  return (
    <ImageIdContext.Provider value={{ImageId, setImageId }}>
      {props.children}
    </ImageIdContext.Provider>
  );
};

export default ImageIdProvider;
