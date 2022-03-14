 import {createContext, useState, useEffect} from "react";
 

 const FeebackContext = createContext()

 export const FeedbackProvider = ({children}) => {
     const [isLoading, setisLoading] = useState(true)
     const [feedback, setFeedback] = useState([])
     const [feedbackEdit, setFeedbackEdit] = useState({
       item:{},
       edit: false
     })

     useEffect(() => {
      fetchFeedback()
     }, [])

     //Fetch Feedback
     const fetchFeedback = async () => {
       const response = await fetch(`/feedback?_sort=id&_order=desc`)
      const data = await response.json()

      setFeedback(data)
      setisLoading(false)
      }

     const addFeedback = async (newFeedback) => {
       const response = await fetch('/feedback',{
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(newFeedback),
       })
       const data = await response.json()
        setFeedback([data, ...feedback])
    }

     const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure qe po don me fshi?')){
          await fetch(`/feedback/${id}`,{method: 'DELETE'})

        setFeedback(feedback.filter((item) => item.id !== id))
    }
    }

    const updateFeedback = async (id, updItem) => {
      const response = await fetch(`/feedback/${id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(updItem)
      })
      const data = await response.json()



      setFeedback(
        feedback.map((item) => (item.id === id ? {...item, ...data} : item
      )))
    }
    
    const editFeedback = (item) => {
        setFeedbackEdit({
          item,
          edit: true
        })
    }
    return <FeebackContext.Provider 
    value={{
       feedback,
       feedbackEdit,
       isLoading,
       deleteFeedback,
       addFeedback,
       editFeedback,
       updateFeedback,
     }}>
        {children}
    </FeebackContext.Provider>
 }

 export default FeebackContext