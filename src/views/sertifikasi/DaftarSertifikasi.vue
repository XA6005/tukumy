<template>
  <v-app id="Daftar Sertifikasi">
    <v-main>
      <h1 style="text-align: center"><br />Daftar Jadwal Sertifikasi</h1>
      <v-container>
        <v-dialog v-model="dialog" scrollable max-width="700px">
          <v-card>
            <v-card-title
              >Untuk Melanjutkan Silahkan Jawab Pertanyaan Berikut</v-card-title
            >
            <v-divider></v-divider>
            <v-card-text style="height: 150px">
              <br />
              <h3>
                Apakah sudah mengikuti matakuliah bootcamp {{ nama_skema }}?
              </h3>
              <v-radio-group v-model="dialogm1" column>
                <v-radio label="Sudah Mengikuti" value="Mengikuti"></v-radio>
                <v-radio
                  label="Belum Mengikuti"
                  value="Tidak Mengikuti"
                ></v-radio>
              </v-radio-group>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="closeBootcamp()">
                Close
              </v-btn>
              <v-btn color="green darken-1" text @click="login()">
                Daftar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-sheet class="ma-9" elevation="8" v-for="vw in skemaid"
          :key="vw.id">
          <h2 style="text-align: center"><br/>Daftar Jadwal Skema {{vw.nama}}</h2>
        <v-slide-group
          v-model="model"
          class="pa-4"
          center-active
          active-class="success"
          show-arrows
        >
          <v-slide-item v-for="card in cardSertifikasi" :key="card.id">
            <v-card class="ma-4" height="500" width="700" v-if="vw.id==card.skema_id">
              <v-card-title class="justify-center"
                >Jadwal Sertifikasi {{ card.nama_skema }}</v-card-title
              >
              <v-card-text id="isi">
                <v-row justify="center" align="center" v-if="card.tipe_ujian == 'Offline'">
                  <v-col lg="2"> Tempat </v-col>
                  <v-col md="auto"> : </v-col>
                  <v-col md="2">
                    {{ card.tempat }}
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col lg="2"> Tanggal Sertifikasi </v-col>
                  <v-col md="auto"> : </v-col>
                  <v-col lg="2">
                    {{ card.tanggal_ujian }}
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col lg="2"> Terakhir Pendaftaran </v-col>
                  <v-col md="auto"> : </v-col>
                  <v-col lg="2">
                    {{ card.tanggal_tutup }}
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col lg="2"> Jam </v-col>
                  <v-col md="auto"> : </v-col>
                  <v-col lg="2">
                    {{ card.jam }}
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col lg="2"> Biaya </v-col>
                  <v-col md="auto"> : </v-col>
                  <v-col lg="2">
                    {{ Number(card.biaya).toLocaleString() }}
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col lg="2"> Tipe </v-col>
                  <v-col md="auto"> : </v-col>
                  <v-col lg="2">
                    {{ card.tipe_ujian }}
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                  color="#065139"
                  class="mr-2 white--text"
                  @click="DialogBc(card.id, card.nama_skema)"
                >
                  Daftar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-slide-item>
        </v-slide-group>
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dialogm1: "",
      dialog: false,
      tunnel: "",
      id: null,
      nama_skema: null,
      cardSertifikasi: [
        {
          id: 1,
          tempat: "LAB A",
          tanggal_ujian: "2021-04-30",
          tanggal_tutup: "2021-04-25",
          jam: "9:00",
          tipe_ujian: "Offline",
          biaya: 200000,
          skema_id: 1,
          nama_skema: "Programmer",
        },
        {
          id: 2,
          tanggal_ujian: "2021-04-30",
          tanggal_tutup: "2021-04-25",
          jam: "12:00",
          tipe_ujian: "Online",
          biaya: 300000,
          skema_id: 1,
          nama_skema: "Programmer",
        },
        {
          id: 3,
          tanggal_ujian: "2021-04-30",
          tanggal_tutup: "2021-04-25",
          jam: "9:00",
          tipe_ujian: "Online",
          biaya: 200000,
          skema_id: 2,
          nama_skema: "Networking",
        },
        {
          id: 4,
          tanggal_ujian: "2021-04-30",
          tanggal_tutup: "2021-04-25",
          jam: "9:00",
          tipe_ujian: "Online",
          biaya: 200000,
          skema_id: 3,
          nama_skema: "Database",
        },
        {
          id: 5,
          tanggal_ujian: "2021-05-03",
          tanggal_tutup: "2021-04-27",
          jam: "12:00",
          tipe_ujian: "Online",
          biaya: 300000,
          skema_id: 1,
          nama_skema: "Programmer",
        },
      ],
      skemaid: [
        { id: 1, nama: "Programmer" },
        { id: 2, nama: "Networking" },
        { id: 3, nama: "Database" },
      ],
      skema: ["Programmer", "Networking", "Database"],
    };
  },
  methods: {
    DialogBc(cid, cnama) {
      this.id = cid;
      (this.nama_skema = cnama), (this.dialog = true);
    },

    closeBootcamp() {
      this.$cookies.remove("sertifikasi");
      this.$cookies.remove("bootcamp");
      this.dialog = false;
    },
    login() {
      this.$cookies.set("sertifikasi", this.id);
      this.$cookies.set("bootcamp", this.dialogm1);
      /* localStorage.setItem("sertifikasi", this.id);
      localStorage.setItem("bootcamp", this.dialogm1); */
      // start save jadwal
      if (this.$store.getters.isLoggedInPeserta) {
        /* const formdata = new FormData();
        formdata.append("jadwal_id", this.id);
        axios
          .post(`${this.tunnel}status`, formdata, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            }, 
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.snackbar = true;
            // start save bootcamp
            const formdata = new FormData();
            formdata.append("jadwal_id", this.id);
            formdata.append("status_bootcamp", this.dialogm1);
            formdata.append("_method", "PUT");
            axios
              .post(`${this.tunnel}status/bootcamp`, formdata, {
                headers: {
                  Authorization: "Bearer " + this.$store.state.token,
                },
              })
              .then((response) => {
                this.error_message = response.data.message;
                this.snackbar = true;
                localStorage.removeItem("sertifikasi");
                localStorage.removeItem("bootcamp"); */
        this.$router.push({
          name: "form-daftar",
        });
        /* })
              .catch((error) => {
                this.error_message = error;
                this.snackbar = true;
              });
            // end save bootcamp
          })
          .catch((error) => {
            this.error_message = error;
            this.snackbar = true;
          });
        //end save jadwal */
      } else {
        this.$router.push({
          name: "login-peserta",
        });
      }
    },
  },
  mounted() {
    this.tunnel = this.$store.state.tunnel;
    axios
      .get(`${this.tunnel}skema`)
      .then((response) => {
        this.skemaid = response.data.skema.map((item) => {
          return {
            id: item.id_skema,
            nama: item.nama_skema,
          };
        });
        this.skema = response.data.skema.map((item) => {
          return item.nama_skema;
        });
      })
      .catch((error) => {
        this.error_message = error;
        this.snackbar = true;
      });
    axios
      .get(this.tunnel + "jadwal", {
        headers: {},
      })
      .then((response) => {
        const sertifikasiSem = response.data.jadwal.map((item) => {
          return {
            detail: item,
            skema_id: item.skema_id,
            nama: this.skemaid.find(({ id }) => id === item.skema_id),
          };
        });
        this.cardSertifikasi = sertifikasiSem.map((item) => {
          return {
            id: item.detail.id_jadwal,
            tempat: item.detail.tempat,
            tanggal_ujian: item.detail.tanggal_ujian,
            tanggal_tutup: item.detail.tanggal_tutup,
            jam: item.detail.jam,
            tipe_ujian: item.detail.tipe_ujian,
            biaya: item.detail.biaya,
            skema_id: item.detail.skema_id,
            nama_skema: item.nama.nama,
          };
        });
      });
  },
};
</script>