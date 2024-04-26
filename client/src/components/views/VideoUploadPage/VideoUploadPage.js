// This is a React component for uploading videos. It includes state management, form handling, and API calls to upload video files and thumbnails.

import React,{useState} from 'react'; // Importing React and the useState hook from the react package
import {Typography, Button, Form, Input, Icon, message} from 'antd'; // Importing components from antd library
import Dropzone from 'react-dropzone'; // Importing Dropzone component for file uploads
import Axios from 'axios'; // Importing Axios for making HTTP requests
import {useSelector} from 'react-redux'; // Importing useSelector hook from react-redux to access Redux store state

const {TextArea} = Input; // Destructuring TextArea from Input component
const {Title} = Typography; // Destructuring Title from Typography component

const PrivateOptions = [ // Array of options for privacy settings
    {value:0, label: "Private"},
    {value:1, label: "Public"}
]

const CategoryOption = [ // Array of options for video categories
    {value:0, label: "Film & Animation"},
    {value:1, label: "Autos & Vehicles"},
    {value:2, label: "Music"},
    {value:3, label: "Pets & Animals"}
]

function VideoUploadPage(props) { // React functional component for the video upload page
    const user = useSelector(state => state.user) // Accessing user state from Redux store
    const [VideoTitle, setVideoTitle] = useState('') // State for video title
    const [Description, setDescription] = useState('') // State for video description
    const [Private, setPrivate] = useState(0) // State for video privacy setting
    const [Category, setCategory] = useState("Film & Animation") // State for video category
    const [FilePath, setFilePath] = useState("") // State for video file path
    const [Duration, setDuration] = useState("") // State for video duration
    const [ThumbnailPath, setThumbnailPath] = useState("") // State for video thumbnail path

    const onTitleChange = (e) => { // Handler for title change event
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => { // Handler for description change event
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => { // Handler for privacy change event
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => { // Handler for category change event
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => { // Handler for file drop event in Dropzone
        let formData = new FormData; // Creating a new FormData object
        const config = { // Configuration object for Axios request
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0]) // Appending the dropped file to formData
        console.log(files) // Logging the files to the console

        Axios.post('/api/video/uploadfiles', formData, config) // Making a POST request to upload the video file
            .then(response => {
                if(response.data.success){  
                    let variable = { // Creating an object with the response data
                        url: response.data.url,
                        fileName: response.data.fileName
                    }

                    setFilePath(response.data.url) // Setting the file path state

                   Axios.post('/api/video/thumbnail', variable) // Making a POST request to create a thumbnail
                   .then(response => {
                       if(response.data.success){   
                            console.log(response.data) // Logging the response data to the console
                            setDuration(response.data.fileDuration) // Setting the duration state
                            setThumbnailPath(response.data.filePath) // Setting the thumbnail path state
                       }else{
                           alert('썸네일 생성에 실패했습니다') // Alerting if thumbnail creation fails
                       }
                   })
                }else{
                    alert('비디오 업로드를 실패했습니다') // Alerting if video upload fails
                }
            })
    }

    const onSubmit = (e) => { // Handler for form submit event
        e.preventDefault(); // Preventing the default form submit action

        const variables = { // Creating an object with the video data
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: ThumbnailPath
        }

        Axios.post('/api/video/uploadVideo', variables) // Making a POST request to upload the video data
            .then(response => {
                if(response.data.success){
                    message.success('성공적으로 업로드를 했습니다') // Displaying success message
                    
                    setTimeout(()=>{ // Setting a timeout to redirect after 3 seconds
                    props.history.push('/') // Redirecting to the home page
                    },3000)
                    
                }else{
                    alert('비디오 업로드에 실패했습니다') // Alerting if video data upload fails
                }
            })
    }

    return ( // JSX to render the video upload form
        <div style={{maxWidth: '700px', margin:'2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    {/* drop-zone */}
                    {/* Thumbnail */}
                    <Dropzone 
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={1000000000000}>
                    {({getRootProps, getInputProps})=>(
                       <div style={{width: '300px', height: '240px', border:'1px solid lightgray', display:'flex',
                       alignItems:'center', justifyContent:'center' }} {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <Icon type="plus" style={{fontSize:'3rem'}}/>  
                       </div> 
                    )}
                    </Dropzone>
                    
                    {ThumbnailPath &&
                    <div>
                        <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail"/>
                    </div>
                    }
                    
                </div>
            <br/>
            <br/>
            <label>Title</label>
            <Input
                onChange={onTitleChange}
                value={VideoTitle}
            />
            <br/>
            <br/>
            <label>Description</label>
            <TextArea
                onChange={onDescriptionChange}
                value={Description}
            />
            <br/>
            <br/>

            <select onChange={onPrivateChange}>
                {PrivateOptions.map((item, index)=>(
                    <option key={index} value={item.value}>{item.label}</option>
                ))}     
            </select>

            <br/>
            <br/>

            <select onChange={onCategoryChange}>
                {CategoryOption.map((item,index)=>(
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>

            <br/>
            <br/>

            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>
           
            </Form>

        </div>

       

    )
}

export default VideoUploadPage // Exporting the VideoUploadPage component for use in other parts of the application