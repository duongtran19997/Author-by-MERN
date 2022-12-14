import styled from "styled-components";
import {lg, md, sm} from "../../BreakPoints";

export const Container = styled.div`
  background: linear-gradient(rgb(234, 230, 255), rgb(255, 255, 255)) no-repeat;
  color: rgb(9, 30, 66);
  width: 100%;
  display: flex;
  justify-content: center;
  color: #091e42;
  
`;

export const Content = styled.section`
  display: flex;
  min-height: 100vh;
  padding-top: 4rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10%;
  ${lg({
    flexDirection: "column-reverse",
    paddingTop: "6rem",
    alignItems: "stretch",
    gap: "5%",
})}
`;

export const LeftSide = styled.div`
  box-sizing: border-box;
  flex: 1;
`;
export const LeftWrapper = styled.div`
  width: 39rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  ${sm({
    width: "19rem",
    alignItems: "center",
})}
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  ${sm({
    fontSize: "1.5rem",
    textAlign: "center",
})}
`;

export const Text = styled.h3`
  font-weight: normal;
  margin-top: 1rem;
  font-family: "Charlie Text", sans-serif;
  font-size: 1.3rem;
  text-align: left;
  line-height: 1.5;
  ${sm({
    fontSize: "1rem",
    textAlign: "center",
    padding: "0px, 3rem",
})}
`;

export const Button = styled.button`
  font-size: 1rem;
  background-color: #0065ff;
  width: 35%;
  border-radius: 0.3rem;
  padding: 0.75rem 1rem 0.8rem;
  -webkit-box-align: center;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0952cc;
  }
  ${lg({
    marginTop: "1.5rem",
    width: "100%",
})}
`;

export const RightSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  ${lg({
    maxHeight: "300px",
})}
`;

export const SvgItem = styled.img`
  width: 400.5px;
  aspect-ratio: auto 465.5 / 602.5;
  height: 540.5px;
  ${lg({
    width: "300px",
    height: "272px",
})}
`;
export const Input = styled.input`
  width: 100%;
  outline: none;
  font-size: 0.85rem;
  border-radius: 0.2rem;
  padding: 0.6rem;
  border: 2px solid #dfe1e6;
  background-color: #fafbfc;
  &:focus {
    transition: background-color 0.2s ease-in-out 0s,
      border-color 0.2s ease-in-out 0s;
    border: 2px solid #68bcff;
  }
  ${lg({
    marginTop: "1.5rem",
    width: "100%",
  })}
`;
export const Form = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
  ${md({
  gap: "0.7rem",
})}
`;