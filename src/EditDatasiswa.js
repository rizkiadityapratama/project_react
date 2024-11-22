import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';  // Import SweetAlert

export default function EditData() {
  const [nik, setNik] = useState("");  // NIK
  const [nama, setNama] = useState("");  // Nama Siswa
  const [jurusan, setJurusan] = useState("");  // Jurusan
  const [gender, setGender] = useState("");  // Gender
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil ID siswa dari URL

  // Fetch data siswa berdasarkan id
  useEffect(() => {
    axios
      .get(`http://localhost:3030/siswa/${id}`)  // Mengambil data berdasarkan ID siswa
      .then((response) => {
        const siswa = response.data;
        setNik(siswa.nik);
        setNama(siswa.nama);
        setJurusan(siswa.jurusan);
        setGender(siswa.gender);
      })
      .catch((error) => {
        console.error("Error fetching siswa data:", error);
        Swal.fire("Gagal!", "Tidak dapat mengambil data siswa.", "error");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!nik || !nama || !jurusan || !gender) {
      Swal.fire("Gagal!", "Semua field wajib diisi!", "error");
      return;
    }

    try {
      // Update data siswa yang ada
      const updatedSiswa = {
        nik,
        nama,
        jurusan,
        gender,
      };

      await axios.put(`http://localhost:3030/siswa/${id}`, updatedSiswa); // Update data siswa

      Swal.fire("Berhasil!", "Data siswa berhasil diperbarui.", "success");
      navigate("/datasiswa"); // Navigasi ke halaman daftar siswa
    } catch (error) {
      console.error("Error updating siswa:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat memperbarui data siswa.", "error");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Ubah Data Murid
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="NIK"
          name="nik"
          value={nik}  // Menghubungkan dengan state NIK
          onChange={(e) => setNik(e.target.value)}  
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Nama"
          name="nama"
          value={nama}  // Menghubungkan dengan state Nama
          onChange={(e) => setNama(e.target.value)}  
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Jurusan"
          name="jurusan"
          value={jurusan}  // Menghubungkan dengan state Jurusan
          onChange={(e) => setJurusan(e.target.value)}  
          margin="normal"
          variant="outlined"
        />

        {/* Gender Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            value={gender || ""}  // Menghubungkan dengan state Gender, pastikan tidak undefined
            onChange={(e) => setGender(e.target.value)}  
            label="Gender"
            name="gender"
            required
          >
            <MenuItem value="Laki-laki">Laki-laki</MenuItem>
            <MenuItem value="Perempuan">Perempuan</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, width: '100%' }}
        >
          Simpan Perubahan
        </Button>
      </form>

      <Typography variant="body1" align="center" sx={{ mt: 2 }}>
        Edit data murid
      </Typography>
    </Container>
  );
}
