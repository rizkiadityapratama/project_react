import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

// Styled components
const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundImage: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)", // Gradient background
  backgroundSize: "cover",
  padding: theme.spacing(2),
  textAlign: "center",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  fontWeight: "bold",
  padding: theme.spacing(1, 4),
  textTransform: "none",
  borderRadius: "20px",
  fontSize: "16px",
  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "3rem",
  color: "#ffffff",
  marginBottom: theme.spacing(4),
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
}));

const Home = () => {
  const navigate = useNavigate();

  return (
    <StyledBox>
      <StyledTypography>
       Selamat datang di project Rizki
      </StyledTypography>

      <Box>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={() => navigate("/Dataguru")}
        >
          Go to Data Guru
        </StyledButton>

        <StyledButton
          variant="contained"
          color="secondary"
          onClick={() => navigate("/Datasiswa")}
        >
          Go to Data Siswa
        </StyledButton>
      </Box>
    </StyledBox>
  );
};

export default Home;
