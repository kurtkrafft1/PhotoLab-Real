import React from "react"
import { confirmAlert } from 'react-confirm-alert'; 
import PhotographyManager from "../../modules/PhotographyManager"

const MyPhotoCard = props => {
    const HandleDelete = id => {
        // props.setModalOpen(true)
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () =>  PhotographyManager.deletePhoto(id).then(
                    props.setRefreshPhotos(true)
                )
                
                
              },
              {
                label: 'No',
                onClick: () => props.setRefreshPhotos(true)
              }
            ]
          });
    }
    return(
        <div className = "card">
            <div className="card-content">
                <picture>
                    <img src={`${props.photo.url}`} alt="My Photo" className="my-photo" onClick={()=> props.history.push(`/myphotos/${props.photo.id}`)}/>
                </picture>
                <p className = "light-text">{props.photo.date}</p>
                <h3><span className="title-name">{props.photo.title} </span></h3>
               <i id="icons"className="trash alternate outline icon" onClick={()=> HandleDelete(props.photo.id)}></i>
                <i id="icons"className="eye icon" onClick={()=> props.history.push(`/myPhotos/${props.photo.id}`)}></i>
            </div>
        </div>
    )
}
export default MyPhotoCard;