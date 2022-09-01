import styled from 'styled-components'

export const emptyHandler = styled.h2`
background-color: black;
`

export const Container = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: column;
align-items: flex-end;
color: snow;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
.Symbol{
    color: grey;
    font-size: small;
}
img{
    border-radius: 50%;
}
h4{
    display: flex;
}
div{
    margin-right: 15px;
}
p{
    margin: 1px;
}
`

export const FormContainer = styled.div`
display: flex;
flex-direction: column;
margin-right: 9px;
input{
    max-width: 145px;
    height: 41px;
  border-radius: 11px;
  padding: 0 16px;
  background: #fff;
  border: 1px solid #a8a8b3;
}
label{
    font-size: small;
    margin-top: 8px;
    justify-content: center;
    display: flex;
}
a{
    text-decoration:none;
    color: #3518f5;
    margin-left: 5px;
}
`

export const Form = styled.form`
display: flex;
justify-content: center;
margin-top: 25px;
`

export const SubmitButton = styled.input`
   height: 41px;
        border-radius: 8px;
        font-weight: 500;
        background: #3518f5;
        color: #FFF;
        padding: 0 32px;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
        border: 0;
        transition: filter 0.2s;

        img{
            margin-right: 8px;
        }
        &.outlined{
            background: #FFF;
            border: 1px solid #835afd;
            color: #835afd;
        }
        &:not(:disabled):hover{
            filter: brightness(0.9);
        }
        &:disabled{
            opacity: 0.6;
            cursor: not-allowed;
        }
`