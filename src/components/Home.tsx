import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const languages = [
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "French",
    code: "fr",
  },
];

const Home = () => {

  const navigate = useNavigate()

  const languageSelectHandler = (language:string):void=>{
    navigate(`/learn?language=${language}`)
  }

  return (
    <Container maxWidth={"sm"}>
      <Typography variant="h3" p={"2rem"} textAlign={"center"}>
        Start your linguistic journey today
        and unlock a world of communication and connection.
      </Typography>
      <Typography textAlign={"center"}>
        Choose and Master
      </Typography>
      <Stack
        direction={"row"}
        spacing={"2rem"}
        p="2rem"
        alignItems={"center"}
        justifyContent={"center"}
      >

        {
          languages.map(i=>(
            <Button onClick={()=>languageSelectHandler(i.code)} key={i.code} variant="contained">
              {i.name}
            </Button>
          ))
        }
      </Stack>
    </Container>
  );
};

export default Home;
