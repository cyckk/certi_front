<template>
  <!-- <q-page class="bg-red"> -->
  <section class="" style="width: 95%; height: 100vh;  ">
    <div class="">
      <div
        class="abc"
        style="
        display: flex;
        padding: 0.75rem;
        flex-direction: column;
        background-repeat: no-repeat;
        background-position: center;
        
        background-size: cover;
      "
      >
        <!-- head -->
        <div
          class="logo"
          style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: 50px;
          padding-bottom: 25px;
          margin-top: 20px;
        "
        >
          <img src="../assets/newLogo.png" alt="logo" style="height: 80px" />
          <div class="heading" style="margin-top: 1.5rem; text-align: center">
            <h3 style="font-size: 36px; font-weight: 700" class="font-2">
              Data Trained Education, Bengaluru, Karnataka
            </h3>
          </div>
        </div>

        <div class="px-5">
          <div class="ids d-flex justify-content-between my-5">
            <h6 class="h6 p-0 m-0 font-2">
              Enrolment ID:
              {{ response.enrollment_id ? response.enrollment_id : '112233' }}
            </h6>
            <h6 class="h6 p-0 m-0 font-2">
              Certificate No: C{{
                response.certificate_id ? response.certificate_id : '21212'
              }}
            </h6>
          </div>

          <div class="mb-5">
            <h3
              class="h3 p-0 m-0 font-2 font-3 text-center"
              style="font-weight: 600"
            >
              Certificate of Completion
            </h3>
          </div>

          <div
            class="main-section px-5 m-auto d-flex justify-content-center align-items-center flex-column"
          >
            <p class="font p-0 m-0">This is to certify that</p>
            <h3 class="h3 font-1 p-0 m-0 name font-2">
              {{ response.Name ? response.Name : 'Rashid Khan' }}
            </h3>
            <p class="font p-0 m-0">has successfully completed the course</p>
            <h4 class="h4 p-0 m-0 font-2" style="font-weight: 900">
              PG Program in
            </h4>
            <h4 class="p-0 m-0 ds font-2" style="font-weight: 900">
              Data Science, Machine Learning and Neural Networks
              <!-- {{ response.courses }} -->

              <!-- {{ response.course }} -->
            </h4>
            <p class="font p-0 m-0" style="margin-bottom: 0rem !important">
              {{ position ? '' : 'position' }}
            </p>
            <!-- <p class="p-0 m-0 score font-2">
            Cumulative Objecttive Score as {{ response.cumulativeobjective }}
          </p>
          <p class="p-0 m-0 score font-2">
            Cumulative Subjective Score as
            {{ response.cumulativesubjective }} and
          </p>
          <p class="p-0 m-0 scor font-2">
            Cumulative Ability Score as {{ response.cumulativeabilityscore }}
          </p> -->
            <!-- <div
            style="
              padding: 0.25rem;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          > -->
            <!-- <h3 style="margin: 0.1rem 0rem">Cumulative Scores</h3> -->
            <!-- <table
              style="
                width: calc(80% - 1rem);
                margin-bottom: 1rem;
                color: black;
                display: table;
                border-spacing: 2px;
                border-color: rgb(32, 32, 32);
                border-collapse: collapse;
                border: 1px solid #373838;
              "
            >
              <thead>
                <tr>
                  <th
                    style="
                      border: 1px solid #2d2d2e;
                      text-align: center;
                      padding: 0.2rem;
                    "
                    class="font-2"
                  >
                    S.No
                  </th>
                  <th
                    style="
                      border: 1px solid #2d2d2e;
                      text-align: center;
                      padding: 0.2rem;
                    "
                    class="font-2"
                  >
                    Name
                  </th>
                  <th
                    style="
                      border: 1px solid #2d2d2e;
                      text-align: center;
                      padding: 0.2rem;
                    "
                    class="font-2"
                  >
                    Max Score
                  </th>
                  <th
                    style="
                      border: 1px solid #2d2d2e;
                      text-align: center;
                      padding: 0.2rem;
                    "
                    class="font-2"
                  >
                    Score Obtained
                  </th>
                </tr>
              </thead>
              <tbody>
                 <tr>
                  <td
                    style="
                      border: 1px solid #2d2d2e;
                      text-align: center;
                      padding: 0.2rem;
                    "
                    class="font-2"
                  >
                    1
                  </td>
                  <td
                    style="
                      border: 1px solid #2d2d2e;
                      text-align: center;
                      padding: 0.2rem;
                    "
                    class="font-2"
                  >
                    Cumulative Objective Score
                  </td>
                  <td
                    style="
                      border: 1px solid #2d2d2e;
                      text-align: center;
                      padding: 0.2rem;
                    "
                    class="font-2"
                  >
                    100
                  </td>
                  <td
                    style="
                      border: 1px solid #2d2d2e;
                      text-align: center;
                      padding: 0.2rem;
                    "
                    class="font-2"
                  >
                    {{ response.cumulativeobjective }}
                  </td>
                </tr>
                 <tr>
                  <td
                    style="
                      border: 1px solid #2d2d2e;
                      text-align: center;
                      padding: 0.2rem;
                    "
                    class="font-2"
                  >
                    2
                  </td>
                  <td
                    style="
                      border: 1px solid #2d2d2e;
                      text-align: center;
                      padding: 0.2rem;
                    "
                    class="font-2"
                  >
                    Cumulative Subjective Score
                  </td>
                  <td
                    style="
                      border: 1px solid #2d2d2e;
                      text-align: center;
                      padding: 0.2rem;
                    "
                    class="font-2"
                  >
                    100
                  </td>
                  <td
                    style="
                      border: 1px solid #2d2d2e;
                      text-align: center;
                      padding: 0.2rem;
                    "
                    class="font-2"
                  >
                    {{ response.cumulativesubjective }}
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      border: 1px solid #2d2d2e;
                      text-align: center;
                      padding: 0.2rem;
                    "
                    class="font-2"
                  >
                    3
                  </td>
                  <td
                    style="
                      border: 1px solid #2d2d2e;
                      text-align: center;
                      padding: 0.2rem;
                    "
                    class="font-2"
                  >
                    Project Ability Score
                  </td>
                  <td
                    style="
                      border: 1px solid #2d2d2e;
                      text-align: center;
                      padding: 0.2rem;
                    "
                    class="font-2"
                  >
                    10
                  </td>
                  <td
                    style="
                      border: 1px solid #2d2d2e;
                      text-align: center;
                      padding: 0.2rem;
                    "
                    class="font-2"
                  >
                    {{ response.cumulativeabilityscore }}
                  </td>
                </tr>
              </tbody>
            </table> -->
            <!-- </div> -->
            <!-- <p class="p-0 m-0 font" style="margin-top: 0rem !important">
            on february <span>2021</span>
          </p> -->
          </div>
          <div
            class="sign d-flex justify-content-between px-5 align-items-end"
            style="padding-top: 0px; margin-top: 4rem"
          >
            <div
              class="d-flex justify-content-center flex-column align-items-center"
            >
              <img src="../assets/s1.png" style="width: 300px" alt="" />
              <h6 class="h6 p-0 m-0 font-2">Rashid Khan</h6>
              <h6 class="p-0 m-0 font-2">CEO</h6>
            </div>

            <div class="stamp">
              <img src="../assets/Stamp2.png" alt="" />
            </div>

            <div
              class="d-flex justify-content-center flex-column align-items-center"
            >
              <img src="../assets/s2.png" style="width: 300px" alt="" />

              <h6 class="h6 p-0 m-0 font-2">Dr. Deepika Sharma</h6>
              <h6 class="p-0 m-0 font-2">VP, Learning and Development</h6>
            </div>
          </div>

          <div class="m-auto">
            <p class="m-auto text-center p-0 m-0 footer font-2">
              Data Trained Education, Bengaluru, Karnataka
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- </q-page> -->
</template>

<script>
export default {
  data() {
    return {
      studentId: null,
      response: {},
      position: {},
    };
  },

  methods: {
    async getStudentDetails() {
      const url = `${process.env.API_URL}/student/get-student-info/${this.studentId}`;

      try {
        const response = await this.$axios.get(url, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        console.log(response);
        this.response = response.data.response[0];

        console.log(this.response);
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
@import url('https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css');

/* You can add global styles to this file, and also import other style files */
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

p {
  margin: 0.5rem 0rem !important;
}

// h4 {
// }

.ds {
  margin-top: 1rem !important;
}

.score {
  margin-top: 0.5rem !important;
  margin-bottom: 0 !important;
}

.footer {
  margin-top: 3rem !important;
  padding-bottom: 2rem !important;
}

.name {
  text-transform: uppercase;
}

.abc {
  border: 20px solid grey;
  background-image: url('../assets/DTBG.png');
  border-image: url('../assets/border4.jpg') 20 / 30px / 0 repeat;
}

.font-2 {
  font-family: 'Lora', serif;
}

.font-3 {
  font-size: 45px;
}

.stamp {
  width: 120px;
  height: 120px;
}

.stamp > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
