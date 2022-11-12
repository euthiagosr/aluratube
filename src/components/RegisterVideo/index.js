import React from "react";
import { StyledRegisterVideo } from "./styles";
import { videoService } from "../../Services/videoService";

function useForm(formProps){
    const [values, setValues] = React.useState(formProps.initialValues);
    const service = videoService();

    var thumbBaseUrl = 'https://img.youtube.com/vi/';
    const validateThumb = () => {
        if(values.url != ''){
            const formatedURL = thumbBaseUrl + thumbBaseUrl.replace(thumbBaseUrl, "") + values.url.replace("https://www.youtube.com/watch?v=","") + '/hqdefault.jpg';
            setValues({...values, thumb: formatedURL});
        }  
    }

    return {
        values,
        service,
        handleChange: (event) => {
            const value = event.target.value;
            const fieldName = event.target.name;

            setValues({
                ...values,
                [fieldName]: value,
            });
            validateThumb();
        },
        clearForm: () => {
            setValues({title: "", url: "", thumb: ""});
        },
        insertVideo: (event) => {
            const videoToSave = event.values;
            service.insertRecord(videoToSave);
        },
    };
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {title: "", url: "", thumb: ""},
    });

    const [formVisible, setFormVisible] = React.useState(false);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisible(true)}> + </button>
            {formVisible && 
                <form onSubmit={
                    (event) => {
                        try {
                            formCadastro.insertVideo(formCadastro);
                            alert('Registro salvo com sucesso!');
                        } catch (error) {
                            alert('Falha no engano! \n' + error);
                        }
                        event.preventDefault();
                        formCadastro.clearForm();
                    }
                }>
                    <div>
                        <button className="close-modal" onClick={() => setFormVisible(false)}>
                            X
                        </button>
                        <input  name="title" 
                                placeholder="Título do Video"
                                value={formCadastro.values.title} 
                                onChange={formCadastro.handleChange} 
                                required={true}
                                minLength={5}
                                />
                        <input  name="url" 
                                placeholder="URL"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange} 
                                required={true}
                                minLength={24}
                                />
                        <button type="submit">Cadastrar</button>
                        <div className="thumb-container">
                            <h2>{formCadastro.values.title}</h2>
                            <img src={formCadastro.values.thumb} />
                        </div>
                    </div>
                </form>
            }
            
        </StyledRegisterVideo>
    );
}