<template>
  <v-app id="Kelola Peserta">
    <v-main>
      <div class="container mt-5">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="jadwal"
          item-key="idku"
          show-select
          class="elevation-1"
        >
          <template v-slot:item.status="{ item }">
            <v-chip :color="getColor(item.status)" dark>{{
              item.status
            }}</v-chip>
          </template>
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Kelola Peserta </v-toolbar-title>
              <v-row>
                <v-spacer></v-spacer>
                <v-col cols="1">
                  <v-btn small class="mr-2 white--text" color="#065139">
                    <download-excel 
                    :data="selected"
                    :fields="selected_field"
                    name="DaftarPesertaSertifikasi.xls"
                    >
                      Download
                    </download-excel>
                  </v-btn>
                </v-col>
                <v-col cols="3">
                  <v-select
                    :items="skema"
                    v-model="cariSkema"
                    label="nama skema"
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="CariTanggal1"
                        label="dari tanggal"
                        append-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="CariTanggal1"
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="3">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="CariTanggal2"
                        label="sampai tanggal"
                        append-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="CariTanggal2"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="1">
                  <v-btn color="red darken-1" dark small @click="hapusFilter"
                    >reset</v-btn
                  >
                </v-col>
              </v-row>
              <v-dialog v-model="dialog" max-width="700px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Bukti Pembayaran</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-img
                        v-if="editedItem.image != null"
                        height="600px"
                        contain
                        :src="tunnel + 'bukti-pembayaran/' + editedItem.image"
                      ></v-img>
                      <v-sheet v-else color="grey" height="600px">
                        <v-row
                          class="fill-height"
                          align="center"
                          justify="center"
                        >
                          <div>
                            <h1>Tidak Ada Gambar</h1>
                          </div>
                        </v-row>
                      </v-sheet>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="close"
                      >Close</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogStatus" max-width="700px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Ubah Status</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-select
                        required
                        :items="stat"
                        v-model="statusItem.status"
                        label="Status"
                      ></v-select>
                      <v-text-field
                        required
                        v-model="statusItem.keterangan"
                        label="Keterangan"
                      ></v-text-field>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="closeStatus"
                      >Cancel</v-btn
                    >
                    <v-btn
                      color="green darken-1"
                      text
                      @click="saveStatus(statusItem)"
                      >Save</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogAPL01" fullscreen>
                <v-card>
                  <v-toolbar color="#fbc800">
                    <v-btn text @click="closedialogAPL01">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>
                      <span class="headline">Data APL 01</span>
                    </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-container>
                      <h2>a. Data Pribadi</h2>
                      <v-text-field
                        v-model="APL01Item.email"
                        label="Email"
                        disabled="true"
                      ></v-text-field>
                      <v-text-field
                        v-model="APL01Item.nama"
                        label="Nama Lengkap"
                        disabled="true"
                      ></v-text-field>
                      <v-text-field
                        v-model="APL01Item.nim"
                        label="NIM"
                        disabled="true"
                      ></v-text-field>
                      <v-text-field
                        v-model="APL01Item.tempat"
                        label="Tempat Lahir"
                        disabled="true"
                      ></v-text-field>
                      <v-text-field
                        v-model="APL01Item.tanggal"
                        label="Tanggal Lahir"
                        disabled="true"
                      ></v-text-field>
                      <v-text-field
                        v-model="APL01Item.jenisKelamin"
                        label="Jenis Kelamin "
                        disabled="true"
                      ></v-text-field>
                      <v-textarea
                        v-model="APL01Item.alamat"
                        label="Alamat Rumah"
                        disabled="true"
                      ></v-textarea>
                      <v-text-field
                        v-model="APL01Item.kodepos"
                        label="Kodepos Rumah"
                        disabled="true"
                      ></v-text-field>
                      <v-text-field
                        v-model="APL01Item.notelpHp"
                        label="No. HP"
                        disabled="true"
                      ></v-text-field>
                      <br />
                      <br />
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              small
              class="mr-2 white--text"
              color="#065139"
              @click="statusDialog(item)"
              >Ubah Status</v-btn
            >
            <v-btn
              small
              class="mr-2 white--text"
              color="#065139"
              @click="lihatItem(item)"
              >Lihat Bukti</v-btn
            >
            <v-btn
              small
              class="mr-2 white--text"
              color="#065139"
              @click="lihatAPL01(item)"
              >Lihat Biodata</v-btn
            >
          </template>
        </v-data-table>
        <v-snackbar v-model="snackbar">{{ error_message }}</v-snackbar>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      token: "",
      snackbar: "",
      error_message: "",
      tunnel: "",
      cariSkema: null,
      CariTanggal1: "",
      CariTanggal2: "",
      menu: false,
      menu2: false,
      tunnelgambar: this.tunnel + "bukti-pembayaran/",
      dialog: false,
      dialogStatus: false,
      dialogAPL01: false,
      selected: [],
      selected_field:{
        "Nama Skema":"namaSkema",
        "Tanggal Ujian" : "tanggalJadwal",
        "Tipe Ujian" : "tipe_ujian",
         Email : "email",
         "Status Bootcamp" :"bootcamp",
        "Status Pembayaran" :"status",
        "NIM Peserta" :"nim",
        "Nama Peserta" :"nama",
        "Tempat Lahir" : "tempat",
        "Tanggal Lahir" :"tanggal",
        "Jenis Kelamin" :"jenisKelamin",
        Alamat :"alamat",
        Kodepos :"kodepos",
        "No Telp HP" : "notelpHp"
      },
      stat: ["Belum Bayar", "Bayar"],
      skema: ["Programmer", "Netrowking"],
      jadwal: [
      ],
      editedItem: {
        skema_id: "",
        id_jadwal: "",
        email: "",
        peserta_id: "",
        status: "",
        image: "",
        sertifikat: "",
      },
      statusItem: {
        skema_id: "",
        nim: "",
        status: "",
        keterangan: "",
      },
      APL01Item: {
        email: "",
        nama: "",
        nim: "",
        tempat: "",
        tanggal: "",
        jenisKelamin: "",
        alamat: "",
        kodepos: "",
        notelpHp: "",
      },
    };
  },

  computed: {
    headers() {
      return [
        {
          text: "Tanggal Jadwal",
          value: "tanggalJadwal",
          align: "start",
          filter: this.filterTanggal,
        },
        { text: "Nama Skema", value: "namaSkema", filter: this.filterSkema },
        { text: "Tipe Ujian", value: "tipe_ujian" },
        { text: "NIM Peserta", value: "nim" },
        { text: "Nama Peserta", value: "nama" },
        { text: "Status Bootcamp", value: "bootcamp" },
        { text: "Status Pembayaran", value: "status" },
        { text: "Keterangan", value: "keterangan" },
        { text: "Action", value: "actions" },
      ];
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  mounted() {
    if (this.$store.getters.isLoggedInAdmin) {
    this.user = this.$store.state.user;
    this.tunnel = this.$store.state.tunnel;
    this.loadData();
    } else {
      this.$router.push("login-admin");
    }
  },

  methods: {
    loadData() {
      axios
        .get(`${this.tunnel}skema`)
        .then((response) => {
          this.skema = response.data.skema.map((item) => {
            return item.nama_skema;
          });
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        });
      this.jadwal = [];
      axios
        .get(this.tunnel + `status`, {
          headers: { Authorization: "Bearer " + this.$store.state.token },
        })
        .then((response) => {
          /* const list = response.data.jadwal.map((det) => {
            return det.peserta;
          });
          const detailJadwal = response.data.jadwal.map((it) => {
            return {
              id: it.id_jadwal,
              tipe_ujian: it.tipe_ujian,
              tanggal: it.tanggal_ujian,
              namaSkema: it.skema.nama_skema,
            };
          });
          const jadwalSem = [].concat.apply([], list).map((item) => {
            return {
              //email: item.email,
              namaSkema: detailJadwal.find(
                ({ id }) => id === item.pivot.id_jadwal
              ),
              pivot: item.pivot,
              biodata: item.biodata,
            };
          });
          this.jadwal = jadwalSem.map((item) => {
            return {
              //email: item.email,
              namaSkema: item.namaSkema.nama_skema,
              tipe_ujian: item.namaSkema.tipe_ujian,
              tanggalJadwal: item.namaSkema.tanggal_ujian,
              id_jadwal: item.pivot.id_jadwal,
              peserta_id: item.pivot.peserta_id,
              status: item.pivot.status_bayar,
              keterangan: item.pivot.keterangan,
              image: item.pivot.bukti_pembayaran,
              nama: item.biodata.nama_peserta,
              nim: item.biodata.NIM,
              tempat: item.biodata.tempat_lahir,
              tanggal: item.biodata.tanggal_lahir,
              jenisKelamin: item.biodata.jenis_kelamin,
              alamat: item.biodata.alamat_rumah,
              kodepos: item.biodata.kodepos_rumah,
              notelpHp: item.biodata.no_hp,
            };
          }); */
           const list = response.data.jadwal.map((det) => {
            return det.biodata;
          });
          const detailJadwal = response.data.jadwal.map((it) => {
            return {
              id: it.id_jadwal,
              tipe_ujian: it.tipe_ujian,
              tanggal: it.tanggal_ujian,
              namaSkema: it.skema.nama_skema,
            };
          });
          const jadwalSem = [].concat.apply([], list).map((item) => {
            return {
              namaSkema: detailJadwal.find(
                ({ id }) => id === item.pivot.jadwal_id
              ),
              biodata: item,
            };
          });
           this.jadwal = jadwalSem.map((item) => {
            return {
              idku:item.biodata.peserta.id_peserta+item.namaSkema.namaSkema+item.namaSkema.tipe_ujian,
              namaSkema: item.namaSkema.namaSkema,
              tipe_ujian: item.namaSkema.tipe_ujian,
              tanggalJadwal: item.namaSkema.tanggal,
              peserta_id: item.biodata.peserta.id_peserta,
              email: item.biodata.peserta.email,
              id_jadwal: item.biodata.pivot.jadwal_id,
              status: item.biodata.pivot.status_bayar,
              keterangan: item.biodata.pivot.keterangan,
              bootcamp: item.biodata.pivot.status_bootcamp,
              image: item.biodata.pivot.bukti_pembayaran,
              nama: item.biodata.nama_peserta,
              nim: item.biodata.NIM,
              tempat: item.biodata.tempat_lahir,
              tanggal: item.biodata.tanggal_lahir,
              jenisKelamin: item.biodata.jenis_kelamin,
              alamat: item.biodata.alamat_rumah,
              kodepos: item.biodata.kodepos_rumah,
              notelpHp: item.biodata.no_hp,
            };
          }); 
        })
        .catch((error) => {
          console.log(error);

          if (error.response.status === 404) {
            this.error_message = "Login Lagi";
            this.snackbar = true;
          }
        });
    },

    lihatItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    lihatAPL01(item) {
      this.APL01Item = Object.assign({}, item);
      this.dialogAPL01 = true;
    },
    statusDialog(item) {
      this.statusItem = Object.assign({}, item);
      this.dialogStatus = true;
    },
    saveStatus(item) {
      var kom = "-";
      if (item.keterangan != "") {
        kom = item.keterangan;
      }
      const data = qs.stringify({
        jadwal_id: item.id_jadwal,
        NIM: item.nim,
        status_bayar: item.status,
        keterangan: kom,
      });
      axios
        .put(`${this.tunnel}status/bayar`, data, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.snackbar = true;
          this.loadData();
          this.closeStatus();
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        });
    },
    close() {
      this.dialog = false;
    },
    closeStatus() {
      this.dialogStatus = false;
    },
    closedialogAPL01() {
      this.dialogAPL01 = false;
    },
    hapusFilter() {
      this.cariSkema = "";
      this.CariTanggal1 = null;
      this.CariTanggal2 = null;
      this.selected= [];
    },
    filterSkema(value) {
      this.selected= [];
      if (!this.cariSkema) {
        return true;
      }
      return value === this.cariSkema;
    },
    filterTanggal(value) {
      this.selected= [];
      if (!this.CariTanggal1 && !this.CariTanggal2) {
        return true;
      } else if (!this.CariTanggal1 && this.CariTanggal2) {
        return value <= this.CariTanggal2;
      } else if (this.CariTanggal1 && !this.CariTanggal2) {
        return this.CariTanggal1 <= value;
      } else if (this.CariTanggal1 > this.CariTanggal2) {
        this.error_message =
          "Pengisian filter tanggal sampai tidak boleh kurang dari dari tanggal";
        this.snackbar = true;
        this.CariTanggal2 = null;
        return true;
      } else {
        if (value >= this.CariTanggal1) {
          return value <= this.CariTanggal2;
        }
      }
    },
    getColor(status) {
      if (status === "Belum Bayar") return "red";
      else if (status === "Sedang Proses") return "orange";
      else return "green";
    },
  },
};
</script>