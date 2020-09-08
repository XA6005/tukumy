<template>
  <v-app id="Kelola Peserta">
    <v-main>
      <div class="container mt-5">
        <v-data-table
          :headers="headers"
          :items="jadwal"
          :item-key="namaSkema"
          class="elevation-1 pa-6"
        >
          <template v-slot:item.status="{ item }">
            <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
          </template>
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Kelola Peserta</v-toolbar-title>
              <v-row>
                <v-spacer></v-spacer>
                <v-col cols="3">
                  <v-select :items="skema" v-model="cariSkema" label="nama skema"></v-select>
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
                    <v-date-picker v-model="CariTanggal1" @input="menu = false"></v-date-picker>
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
                    <v-date-picker v-model="CariTanggal2" @input="menu2 = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="1">
                  <v-btn color="red darken-1" dark small @click="hapusFilter">reset</v-btn>
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
                        v-if="editedItem.image!=null"
                        height="600px"
                        contain
                        :src="tunnel+'bukti-pembayaran/'+editedItem.image"
                      ></v-img>
                      <v-sheet v-else color="grey" height="600px">
                        <v-row class="fill-height" align="center" justify="center">
                          <div>
                            <h1>Tidak Ada Gambar</h1>
                          </div>
                        </v-row>
                      </v-sheet>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="close">Close</v-btn>
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
                      <v-select required :items="stat" v-model="statusItem.status" label="Status"></v-select>
                      <v-text-field required v-model="statusItem.komentar" label="Keterangan"></v-text-field>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="closeStatus">Cancel</v-btn>
                    <v-btn color="green darken-1" text @click="saveStatus(statusItem)">Save</v-btn>
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
                      <v-text-field v-model="APL01Item.email" label="Email" disabled="true"></v-text-field>
                      <v-text-field v-model="APL01Item.nama" label="Nama Lengkap" disabled="true"></v-text-field>
                      <v-text-field v-model="APL01Item.nim" label="NIM" disabled="true"></v-text-field>
                      <v-text-field v-model="APL01Item.tempat" label="Tempat Lahir" disabled="true"></v-text-field>
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
                      <v-text-field
                        v-model="APL01Item.kebangsaan"
                        label="Kebangsaan"
                        disabled="true"
                      ></v-text-field>
                      <v-textarea v-model="APL01Item.alamat" label="Alamat Rumah" disabled="true"></v-textarea>
                      <v-text-field
                        v-model="APL01Item.kodepos"
                        label="Kodepos Rumah"
                        disabled="true"
                      ></v-text-field>
                      <v-text-field
                        v-model="APL01Item.notelpRumah"
                        label="No. Telepon Rumah"
                        disabled="true"
                      ></v-text-field>
                      <v-text-field v-model="APL01Item.notelpHp" label="No. HP" disabled="true"></v-text-field>
                      <v-text-field
                        v-model="APL01Item.pendidikan"
                        label="pendidikan Terakhir"
                        disabled="true"
                      ></v-text-field>
                      <h2>
                        <br />b. Data Pekerjaan Sekarang
                      </h2>
                      <v-text-field v-model="APL01Item.pekerjaan" label="Pekerjaan" disabled="true"></v-text-field>
                      <v-text-field
                        v-model="APL01Item.perusahaan"
                        label="Nama Lembaga / Perusahaan"
                        disabled="true"
                      ></v-text-field>
                      <v-text-field v-model="APL01Item.jabatan" label="Jabatan" disabled="true"></v-text-field>
                      <v-textarea
                        v-model="APL01Item.alamatKantor"
                        label="Alamat Kantor"
                        disabled="true"
                      ></v-textarea>
                      <v-text-field
                        v-model="APL01Item.kodeposKantor"
                        label="Kodepos Kantor"
                        disabled="true"
                      ></v-text-field>
                      <v-text-field
                        v-model="APL01Item.notelpKantor"
                        label="No. Telepon Kantor"
                        disabled="true"
                      ></v-text-field>
                      <v-text-field v-model="APL01Item.fax" label="Fax Kantor" disabled="true"></v-text-field>
                      <v-text-field
                        v-model="APL01Item.emailKantor"
                        label="E-mail Kantor"
                        disabled="true"
                      ></v-text-field>
                      <v-btn
                        v-if="APL01Item.ijazah!=null"
                        small
                        class="mr-2 white--text"
                        color="#065139"
                        :href="tunnel+'ijazah/'+APL01Item.ijazah"
                      >Lihat Ijazah</v-btn>
                      <v-btn
                        v-if="APL01Item.photo!=null"
                        small
                        class="mr-2 white--text"
                        color="#065139"
                        :href="tunnel+'photo/'+APL01Item.photo"
                      >Lihat Pas Photo</v-btn>
                      <v-btn
                        v-if="APL01Item.identitas!=null"
                        small
                        class="mr-2 white--text"
                        color="#065139"
                        :href="tunnel+'kartu-identitas/'+APL01Item.identitas"
                      >Lihat Identitas</v-btn>
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
            >Ubah Status</v-btn>
            <v-btn
              small
              class="mr-2 white--text"
              color="#065139"
              @click="lihatItem(item)"
            >Lihat Bukti</v-btn>
            <v-btn
              small
              class="mr-2 white--text"
              color="#065139"
              @click="lihatAPL01(item)"
            >Lihat Biodata</v-btn>
            <v-btn
              v-if="item.berkas_apl02!=null"
              small
              class="mr-2 white--text"
              color="#065139"
              :href="tunnel+'berkas-apl02-verifikasi/'+item.berkas_apl02"
            >Lihat APL02</v-btn>
            <v-btn
              v-if="item.berkas_verifikasi!=null"
              small
              class="mr-2 white--text"
              color="#065139"
              :href="tunnel+'berkas-verifikasi/'+item.berkas_verifikasi"
            >Lihat verifikasi online</v-btn>
            <v-btn
              v-if="item.sertifikat!=null"
              small
              class="mr-2 white--text"
              color="#065139"
              :href="tunnel+'sertifikat/'+item.sertifikat"
            >Lihat sertifikat</v-btn>
          </template>
        </v-data-table>
        <v-snackbar v-model="snackbar">{{error_message}}</v-snackbar>
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
      stat: ["belum lengkap", "lengkap"],
      skema: [],
      jadwal: [],
      detailJadwal: [],
      editedItem: {
        skemasertifikasi_id: "",
        jadwal_id: "",
        email: "",
        peserta_id: "",
        status: "",
        image: "",
        sertifikat: "",
      },
      statusItem: {
        skemasertifikasi_id: "",
        peserta_id: "",
        status: "",
        komentar: "",
      },
      APL01Item: {
        email: "",
        nama: "",
        nim: "",
        tempat: "",
        tanggal: "",
        jenisKelamin: "",
        kebangsaan: "",
        alamat: "",
        kodepos: "",
        notelpRumah: "",
        notelpHp: "",
        notelpKantor: "",
        pendidikan: "",
        perusahaan: "",
        jabatan: "",
        alamatKantor: "",
        kodeposKantor: "",
        fax: "",
        emailKantor: "",
        pekerjaan: "",
        ijazah: null,
        photo: null,
        identitas: null,
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
        { text: "nama Skema", value: "namaSkema", filter: this.filterSkema },
        { text: "tipe Ujian", value: "tipe" },
        { text: "NIM Peserta", value: "nim" },
        { text: "nama Peserta", value: "nama" },
        { text: "Status", value: "status" },
        { text: "Keterangan", value: "komentar" },
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
          this.skema = response.data.data.SkemaSertifikasi.map((item) => {
            return item.nama;
          });
        })
        .catch((error) => {
          this.error_message = error;
          //this.snackbar = true;
        });
      this.jadwal = [];
      axios
        .get(this.tunnel + `jadwalpeserta`, {
          headers: { Authorization: "Bearer " + this.$store.state.token },
        })
        .then((response) => {
          const list = response.data.data.jadwal.map((det) => {
            return det.peserta;
          });
          const detailJadwal = response.data.data.jadwal.map((it) => {
            return {
              id: it.id,
              tipe: it.tipe,
              tanggal: it.tanggal,
              namaSkema: it.skema_sertifikasi.nama,
            };
          });
          const jadwalSem = [].concat.apply([], list).map((item) => {
            return {
              jadwal_id: item.pivot.jadwal_id,
              email: item.email,
              namaSkema: detailJadwal.find(
                ({ id }) => id === item.pivot.jadwal_id
              ),
              peserta_id: item.pivot.peserta_id,
              status: item.pivot.status,
              komentar: item.pivot.komentar,
              image: item.pivot.bukti_pembayaran,
              berkas_apl02: item.pivot.berkas_apl02,
              berkas_verifikasi: item.pivot.berkas_verifikasi,
              sertifikat: item.pivot.sertifikat,
              nama: item.biodata.namaLengkap,
              nim: item.biodata.nim,
              tempat: item.biodata.tempatLahir,
              tanggal: item.biodata.tanggalLahir,
              jenisKelamin: item.biodata.jenisKelamin,
              kebangsaan: item.biodata.kebangsaan,
              alamat: item.biodata.alamatRumah,
              kodepos: item.biodata.kodeposRumah,
              notelpRumah: item.biodata.noTeleponRumah,
              notelpHp: item.biodata.noHP,
              notelpKantor: item.biodata.noTeleponPerusahaan,
              pendidikan: item.biodata.pendidikanTerakhir,
              perusahaan: item.biodata.namaPerusahaan,
              jabatan: item.biodata.jabatandiPerusahaan,
              alamatKantor: item.biodata.alamatPerusahaan,
              kodeposKantor: item.biodata.kodeposPerusahaan,
              fax: item.biodata.faxPerusahaan,
              emailKantor: item.biodata.emailPerusahaan,
              pekerjaan: item.biodata.pekerjaan,
              ijazah: item.biodata.ijazah,
              photo: item.biodata.photo,
              identitas: item.biodata.kartu_identitas,
            };
          });
          this.jadwal = jadwalSem.map((item) => {
            return {
              jadwal_id: item.jadwal_id,
              email: item.email,
              namaSkema: item.namaSkema.namaSkema,
              tipe: item.namaSkema.tipe,
              tanggalJadwal: item.namaSkema.tanggal,
              peserta_id: item.peserta_id,
              status: item.status,
              komentar: item.komentar,
              image: item.image,
              berkas_apl02: item.berkas_apl02,
              berkas_verifikasi: item.berkas_verifikasi,
              sertifikat: item.sertifikat,
              biodata: item.biodata,
              nama: item.nama,
              nim: item.nim,
              tempat: item.tempat,
              tanggal: item.tanggal,
              jenisKelamin: item.jenisKelamin,
              kebangsaan: item.kebangsaan,
              alamat: item.alamat,
              kodepos: item.kodepos,
              notelpRumah: item.notelpRumah,
              notelpHp: item.notelpHp,
              notelpKantor: item.notelpKantor,
              pendidikan: item.pendidikan,
              perusahaan: item.perusahaan,
              jabatan: item.jabatan,
              alamatKantor: item.alamatKantor,
              kodeposKantor: item.kodeposKantor,
              fax: item.fax,
              emailKantor: item.emailKantor,
              pekerjaan: item.pekerjaan,
              ijazah: item.ijazah,
              photo: item.photo,
              identitas: item.identitas,
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
      if (item.komentar != "") {
        kom = item.komentar;
      }
      const data = qs.stringify({
        jadwal_id: item.jadwal_id,
        peserta_id: item.peserta_id,
        status: item.status,
        komentar: kom,
      });
      axios
        .put(`${this.tunnel}updatestatus`, data, {
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
    },
    filterSkema(value) {
      if (!this.cariSkema) {
        return true;
      }
      return value === this.cariSkema;
    },
    filterTanggal(value) {
      if (!this.CariTanggal1 && !this.CariTanggal2) {
        return true;
      }
      else if (!this.CariTanggal1 && this.CariTanggal2) {
        return value <= this.CariTanggal2;
      }
      else if (this.CariTanggal1 && !this.CariTanggal2) {
        return this.CariTanggal1 <= value;
      }
      else if(this.CariTanggal1>this.CariTanggal2){
        this.error_message = "Pengisian filter tanggal sampai tidak boleh kurang dari dari tanggal";
        this.snackbar = true;
        this.CariTanggal2 = null;
        return true;
      }
      else{
        if (value >= this.CariTanggal1) {
        return value <= this.CariTanggal2;
      }
      }
    },
    getColor(status) {
      if (status === "belum lengkap") return "red";
      else if (status === "sedang proses") return "orange";
      else return "green";
    },
  },
};
</script>