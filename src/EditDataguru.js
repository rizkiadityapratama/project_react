import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';  // Jangan lupa import Swal jika belum ada

export default function EditData() {
  const [nik, setNik] = useState("");  // NIK
  const [nama, setNama] = useState("");  // Nama Guru
  const [mapel, setMapel] = useState("");  // Mata Pelajaran
  const [gender, setGender] = useState("");  // Gender
  const navigate = useNavigate();
  const { id } = useParams(); // To get the guru id from the URL

  // Fetch the guru data based on the id from the URL
  useEffect(() => {
    axios
      .get(`http://localhost:3030/guru/${id}`)  // Mengambil data berdasarkan ID
      .then((response) => {
        const guru = response.data;
        setNik(guru.nik);
        setNama(guru.nama);
        setMapel(guru.mapel);
        setGender(guru.gender);
        // jabatan dihapus
      })
      .catch((error) => {
        console.error("Error fetching guru data:", error);
        Swal.fire("Gagal!", "Tidak dapat mengambil data guru.", "error");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!nik || !nama || !mapel || !gender) {  // Jabatan tidak perlu divalidasi lagi
      Swal.fire("Gagal!", "Semua field wajib diisi!", "error");
      return;
    }

    try {
      // Update data guru yang ada
      const updatedGuru = {
        nik,
        nama,
        mapel,
        gender,
        // jabatan dihapus
      };

      await axios.put(`http://localhost:3030/guru/${id}`, updatedGuru); // Update data guru

      Swal.fire("Berhasil!", "Guru berhasil diperbarui.", "success");
      navigate("/dataguru"); // Navigasi ke halaman daftar guru
    } catch (error) {
      console.error("Error updating guru:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat memperbarui data guru.", "error");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Ubah Data Guru
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Nama Guru di atas NIK */}
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
          label="NIK"
          name="nik"
          value={nik}  // Menghubungkan dengan state NIK
          onChange={(e) => setNik(e.target.value)}  
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Mata Pelajaran"
          name="mapel"
          value={mapel}  // Menghubungkan dengan state Mata Pelajaran
          onChange={(e) => setMapel(e.target.value)}  
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
        Edit data guru
      </Typography>
    </Container>
  );
}
