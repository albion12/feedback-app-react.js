import {v4 as uuidv4} from 'uuid'
 import {createContext, useState} from "react";
 

 const FeebackContext = createContext()

 export const FeedbackProvider = ({children}) => {
     const [feedback, setFeedback] = useState([
      {
        id:1,
        text: 'This is feedback item 1',
        rating: 10
      },
      {
        id:2,
        text: 'This is feedback item 2',
        rating: 3
      },
      {
        id:3,
        text: 'This is feedback item 3',
        rating: 5
      }

     ])
     const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }
     const deleteFeedback = (id) => {
        if(window.confirm('Are you sure qe po don me fshi?')){
        setFeedback(feedback.filter((item) => item.id !== id))
    }
    }

    return <FeebackContext.Provider 
    value={{
       feedback,
       deleteFeedback,
       addFeedback,
     }}>
        {children}
    </FeebackContext.Provider>
 }

 export default FeebackContext