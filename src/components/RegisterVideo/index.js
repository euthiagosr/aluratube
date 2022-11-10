import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(formProps){
    const [values, setValues] = React.useState(formProps.initialValues);
    const [thumbUrl, setThumbUrl] = React.useState("");
    var thumbBaseUrl = 'https://img.youtube.com/vi/';
    const validateThumb = () => {
        if(values.url != ''){
            const formatedURL = thumbBaseUrl + thumbBaseUrl.replace(thumbBaseUrl, "") + values.url.replace("https://www.youtube.com/watch?v=","") + '/hqdefault.jpg';
            setThumbUrl(formatedURL);
        }  
    }

    return {
        values,
        thumbUrl,
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
            setValues({titulo: "", url: ""});
        }
    };
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {titulo: "", url: ""},
    });

    const [formVisible, setFormVisible] = React.useState(false);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisible(true)}> + </button>
            {formVisible && 
                <form onSubmit={
                    (event) => {
                        event.preventDefault();
                        //alert('Video ' + formCadastro.values.titulo +' cadastrado com sucesso!');
                        formCadastro.clearForm();
                    }
                }>
                    <div>
                        <button className="close-modal" onClick={() => setFormVisible(false)}>
                            X
                        </button>
                        <input  name="titulo" 
                                placeholder="Título do Video"
                                value={formCadastro.values.titulo} 
                                onChange={formCadastro.handleChange} 
                                required={true}
                                autoComplete={false}
                                minLength={5}
                                />
                        <input  name="url" 
                                placeholder="URL"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange} 
                                required={true}
                                autoComplete={false}
                                minLength={24}
                                />
                        <button type="submit" >Cadastrar</button>
                        <div className="thumb-container">
                            <h2>{formCadastro.values.titulo}</h2>
                            <img src={formCadastro.thumbUrl} />
                        </div>
                    </div>
                </form>
            }
            
        </StyledRegisterVideo>
    );
}