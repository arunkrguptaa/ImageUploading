import React,{Component} from 'react';
import ReactDom from 'react-dom';
import './styles/styles.scss';
import Dropzone from 'react-dropzone';
import sha1 from 'sha1';
import superagent from 'superagent';


class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            image: [],
        }
    }

    onDrop(files) {
        const image = files[0];
        const cloudName = "arungupta";
        const url = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";
        const timestamp = Date.now() / 1000;
        const uploadPreset = "dxuqdm9m";
        const paramStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'pzRadWWzMuVH_30sVlAnMMSJ_yk';
        const signature = sha1(paramStr);

        const params = {
            'api_key': '427781483788237',
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }

        let uploadRequest = superagent.post(url)
        uploadRequest.attach('file', image)

        Object.keys(params).forEach((key) => {
            uploadRequest.field(key,params[key])
        })

        uploadRequest.end((err, resp) => {
            if(err){
                alert(err);
                return
            }
            // console.log('Upload Complete:'+JSON.stringify(resp.body))
            const uploaded = resp.body;

            let updatedImg = Object.assign([], this.state.image)
            updatedImg.push(uploaded);

            this.setState({
                image: updatedImg
            })            
        })
    }
    render() {
        const list = this.state.image.map((image,i) => {
            return (
                <li key={i}>
                    <div><img style={{width:80}} src={image.secure_url}/></div>
                    <div>Generated Url : {image.secure_url}</div>
                </li>
            )
        })
        return (
            <div>
                <h1>Image uploading</h1>
                <Dropzone onDrop={this.onDrop.bind(this)}>
                    Select file to upload
                </Dropzone>
                <hr/>
                <div>
                    <ol>{list}</ol>
                </div>
            </div>
        ); 
    }
}

ReactDom.render(<App/>, document.getElementById('app'));
