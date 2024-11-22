import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// Styled components untuk Paper dan Button
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "100%",
  maxWidth: "450px",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#ffffff",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  borderRadius: "20px",
  fontWeight: 600,
  padding: theme.spacing(1, 4),
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "#FF7043", // Warna oranye cerah saat hover
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
  },
  marginBottom: theme.spacing(2),
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(3),
  fontWeight: "bold",
  fontSize: "24px",
  color: "#FF7043", // Warna oranye cerah
}));

export default function TambahData({ onAddData }) {
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [jurusan, setJurusan] = useState(""); // Mengganti 'mapel' dengan 'jurusan'
  const [gender, setGender] = useState(""); // Menambahkan field jenis kelamin
  const navigate = useNavigate();

  // Menangani pengiriman form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Memeriksa apakah semua field sudah diisi
    if (!nama || !nik || !jurusan || !gender) {
      Swal.fire("Gagal!", "Semua field wajib diisi!", "error");
      return;
    }

    // Memeriksa apakah NIK berupa angka
    if (!/^\d+$/.test(nik)) {
      Swal.fire("Gagal!", "NIK harus berupa angka!", "error");
      return;
    }

    try {
      // Menyiapkan objek data baru
      const newData = {
        nama,
        nik,
        jurusan, // Menggunakan 'jurusan' daripada 'mapel'
        gender, // Menambahkan field gender
      };

      // Mengirim data baru ke backend (pastikan endpoint sudah benar)
      const response = await axios.post("http://localhost:3030/siswa", newData);

      // Memeriksa respons dari backend (opsional)
      if (response.status === 201) {
        // Menampilkan alert sukses
        Swal.fire("Berhasil!", "Data berhasil ditambahkan.", "success");

        // Memanggil fungsi untuk memperbarui state di parent dengan data baru
        if (onAddData) {
          onAddData(newData); // Jika onAddData disediakan oleh komponen parent
        }

        // Redirect ke halaman lain
        navigate("/datasiswa");
      } else {
        Swal.fire("Gagal!", "Data tidak berhasil ditambahkan.", "error");
      }
    } catch (error) {
      console.error("Error saat menambahkan data:", error);
      // Menampilkan alert error
      Swal.fire("Gagal!", "Terjadi kesalahan saat menambahkan data.", "error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <StyledPaper>
        <FormTitle>✨ Tambah Siswa 🎓</FormTitle>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="Nama"
            variant="outlined"
            fullWidth
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
          <StyledTextField
            label="NIK"
            variant="outlined"
            fullWidth
            type="text"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            required
          />
          <StyledTextField
            label="Jurusan"
            variant="outlined"
            fullWidth
            value={jurusan} // Menggunakan 'jurusan' daripada 'mapel'
            onChange={(e) => setJurusan(e.target.value)} // Menggunakan 'jurusan' daripada 'mapel'
            required
          />
          {/* Pilihan Jenis Kelamin */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="gender-label">Jenis Kelamin</InputLabel>
            <Select
              labelId="gender-label"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Jenis Kelamin"
              required
            >
              <MenuItem value="Laki-laki">Laki-laki</MenuItem>
              <MenuItem value="Perempuan">Perempuan</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <StyledButton
              variant="contained"
              color="secondary"
              onClick={() => navigate("/datasiswa")}
              sx={{ width: "48%" }}
            >
              ❌ Batal
            </StyledButton>
            <StyledButton
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: "48%" }}
            >
              💾 Simpan
            </StyledButton>
          </Box>
        </form>
      </StyledPaper>
    </Box>
  );
}
