<template>
  <section>
    <main class="p-1 main-div">
      <section class="outer p-3">
        <div class="inner p-3">
          <div class="uppper-section px-5">
            <h1 class="heading text-center mt-5">
              Project Completion Certificate
            </h1>
            <div
              class="name d-flex justify-content-center align-items-center flex-column mt-5"
            >
              <p>This is to certify that</p>
              <h1 class="heading-4 mt-3 text-capitalize" style="color: #cc1db9">
                {{ response.name }}
              </h1>
            </div>
            <div
              class="courses d-flex justify-content-center align-items-center flex-column"
            >
              <p>has successfully completed</p>
              <h4 class="heading-4 p-0 m-0 my-2">
                Data Science and Machine Learning Projects
              </h4>
              <small
                >Ability Score: {{ response.cumulativeabilityscore }}
              </small>
            </div>
            <div
              class="footer d-flex justify-content-between align-items-center mt-5 pb-5 mb-3"
            >
              <div class="align-self-end">
                <p>Issued on January 2021</p>
              </div>
              <div class="logo">
                <img src="../assets/d-logo.jpg" alt="" />
              </div>
              <div class="certificate align-self-end">
                <div
                  class="d-flex justify-content-center align-items-center flex-column"
                >
                  <img
                    src="../assets/Achivement.png"
                    class="achivement"
                    alt=""
                  />

                  <p>Certificate ID: P{{ response.certificateID }}</p>
                </div>
              </div>
            </div>

            <div class="m-auto">
              <p
                class="m-auto text-center p-0 m-0 footer"
                style="font-size: 14px !important"
              >
                Data Trained Education, Bengaluru, Karnataka
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

<script>
export default {
  data() {
    return {
      studentId: null,
      response: {},
    };
  },
  methods: {
    async getStudentDetails() {
      const url = `${process.env.API_URL}/student/get_student_marks_info/${this.studentId}`;
      console.log(url);

      try {
        const response = await this.$axios.get(url, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        console.log(response);
        // this.response = response.data.response[0];

        // console.log(this.response);
      } catch (err) {
        console.log(err.message);
      }
    },
  },

  mounted() {
    this.studentId = this.$route.params.studentId;
    console.log(this.studentId);
    this.getStudentDetails();
  },
};
</script>

<style lang="scss" scoped>
/* You can add global styles to this file, and also import other style files */
@import url('https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css');

.badge-danger {
  background-color: #e73f3f !important ;
}

.badge-success {
  background-color: #34c38f !important;
}

.badge {
  font-size: 8px;
  color: #ffffff;
  border: none;
}
.success {
  background-color: #85dbbc !important;
  color: white;
}
.text {
  text-transform: capitalize !important;
}

// Red:-#f46a6a
// Green:-#34c38f
// Blue:-#5b73e8
// Grey:-#74788d
// Black:-#343a40
// Yellow:-#f1b44c

.font {
  // font-family: "Dancing Script", cursive;
  font-family: 'Parisienne', cursive;
  font-size: 30px;
}

.font-1 {
  font-size: 36px !important;
}

/*component styles */

p {
  color: rgba(145, 145, 145, 0.651);
  font-size: 20px;
  font-weight: 500;
  padding: 0;
  margin: 0;
}

.main-div {
  //   width: 70%;
  //   transform: translateY(100%) rotate(90deg);
}

.heading {
  font-size: 50px;
  font-weight: 700;
}

.heading-4 {
  font-weight: 600;
  font-size: 35px;
}

.outer {
  border: 1px solid #cc1db9;
}

.inner {
  border: 5px solid #cc1db9;
  background: url(../assets/CertificateBG3.png) center no-repeat;
  // background-size: 100%, 100%;
  background-size: cover;
}

.courses {
  margin-top: 1rem;
}

small {
  font-size: 20px;
  color: rgba(145, 145, 145, 0.651);
}

.logo {
  width: 80px;
  height: 80px;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.certificate > img {
}

.achivement {
  width: 120px;
  height: 120px;
  object-fit: contain;
}
</style>
