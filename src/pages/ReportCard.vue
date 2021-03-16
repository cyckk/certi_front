<template>
  <section style="width: 90%; margin: auto">
    <div style="">
      <div
        class="abc"
        style="
        display: flex;
        padding: 0.75rem;
        flex-direction: column;
        
        border: 2px solid rgb(196, 39, 175);
        background-repeat: no-repeat;
        background-position: center;
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
          padding-top: 25px;
        "
        >
          <img src="../assets/newLogo.png" alt="logo" style="height: 55px" />
          <div class="heading" style="margin-top: 0.5rem; text-align: center">
            <h3 style="font-size: 24px">
              Data Trained Education, Bengaluru, Karnataka
            </h3>
          </div>
        </div>

        <main class="main-content" style="padding: 0.25rem; margin-top: 1rem">
          <!-- Info -->
          <div class="info" style="padding: 0.5rem">
            <table
              style="
              width: 100%;
              margin-bottom: 1rem;
              color: black;
              display: table;
              border-spacing: 2px;
              border-color: grey;
              border-collapse: collapse;
              border: 1px solid #dee2e6;
            "
            >
              <tr
                style="
                display: table-row;
                vertical-align: inherit;
                border-color: inherit;
                color: black;
                border: 1px solid #dee2e6;
              "
              >
                <th
                  style="
                  border: 1px solid #dee2e6;
                  text-align: start;
                  padding: 0.2rem;
                "
                >
                  Name
                </th>
                <td
                  style="
                  border: 1px solid #dee2e6;
                  padding: 0.2rem;
                  text-transform: capitalize;
                "
                >
                  {{ response.name }}
                </td>
              </tr>
              <tr
                style="
                display: table-row;
                vertical-align: inherit;
                border-color: inherit;
                color: black;
                border: 1px solid #dee2e6;
              "
              >
                <!-- <th
                style="
                  border: 1px solid #dee2e6;
                  text-align: start;
                  padding: 0.2rem;
                "
              >
                Email
              </th>
              <td style="border: 1px solid #dee2e6; padding: 0.2rem">
                {{ response.email }}
              </td> -->
              </tr>
              <tr
                style="
                display: table-row;
                vertical-align: inherit;
                border-color: inherit;
                color: black;
                border: 1px solid #dee2e6;
              "
              >
                <!-- <th
                style="
                  border: 1px solid #dee2e6;
                  text-align: start;
                  padding: 0.2rem;
                "
              >
                Phone
              </th>
              <td style="border: 1px solid #dee2e6; padding: 0.2rem">
                {{ response.phone }}
              </td> -->
              </tr>
              <tr
                style="
                display: table-row;
                vertical-align: inherit;
                border-color: inherit;
                color: black;
                border: 1px solid #dee2e6;
              "
              >
                <th
                  style="
                  border: 1px solid #dee2e6;
                  text-align: start;
                  padding: 0.2rem;
                "
                >
                  Enrolment-ID
                </th>
                <td style="border: 1px solid #dee2e6; padding: 0.2rem">
                  {{ response.enrolmentid }}
                </td>
              </tr>
              <tr
                style="
                display: table-row;
                vertical-align: inherit;
                border-color: inherit;
                color: black;
                border: 1px solid #dee2e6;
              "
              >
                <th
                  style="
                  border: 1px solid #dee2e6;
                  text-align: start;
                  padding: 0.2rem;
                "
                >
                  Course
                </th>
                <td style="border: 1px solid #dee2e6; padding: 0.2rem">
                  {{ response.course }}
                </td>
              </tr>
            </table>
          </div>
          <!-- Assessment Scores -->
          <!-- Assessment Scores -->
          <div style="width: 100%">
            <div style="width: 100%; display: flex">
              <!-- Objective Assessment Scores -->
              <div style="width: 50%; padding: 0.25rem">
                <div style="padding: 0.25rem">
                  <h3 style="margin: 0.1rem 0rem">
                    Objective Assessment Scores
                  </h3>
                  <table
                    style="
                    width: 100%;
                    margin-bottom: 1rem;
                    color: black;
                    display: table;
                    border-spacing: 2px;
                    border-color: grey;
                    border-collapse: collapse;
                    border: 1px solid #dee2e6;
                  "
                  >
                    <tr style="color: black; border: 1px solid #dee2e6">
                      <th
                        style="
                        border: 1px solid #dee2e6;
                        text-align: start;
                        padding: 0.2rem;
                      "
                      >
                        S.No.
                      </th>
                      <th
                        style="
                        border: 1px solid #dee2e6;
                        text-align: start;
                        padding: 0.2rem;
                      "
                      >
                        Test/Exam
                      </th>
                      <th
                        style="
                        border: 1px solid #dee2e6;
                        text-align: start;
                        padding: 0.2rem;
                      "
                      >
                        Max Marks
                      </th>
                      <th
                        style="
                        border: 1px solid #dee2e6;
                        text-align: start;
                        padding: 0.2rem;
                      "
                      >
                        Marks Obtained
                      </th>
                    </tr>
                    <tbody>
                      <tr>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          1
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          Python & SQL Test
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          100
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          {{ response.pythonsql }}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          2
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          Statistics&ML Test
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          100
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          {{ response.statisticsml }}
                        </td>
                      </tr>

                      <!-- <tr>
                      <td
                        style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                      >
                        3
                      </td>
                      <td
                        style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                      >
                        Machine Learning Test
                      </td>
                      <td
                        style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                      >
                        100
                      </td>
                      <td
                        style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                      >
                        {{ response.ml }}
                      </td>
                    </tr> -->
                      <tr>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          3
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          Mid-term Objective Test
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          100
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          {{ response.midtermobj }}
                        </td>
                      </tr>

                      <tr>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          4
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          Final Assessment
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          100
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          {{ response.finalassessment }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Subjective Assessment -->
              <div style="width: 50%; padding: 0.25rem">
                <div style="padding: 0.5rem; width: 100%">
                  <h3 style="margin: 0.1rem 0rem">
                    Subjective Assessment Scores
                  </h3>
                  <table
                    style="
                    width: calc(100% - 1rem);
                    margin-bottom: 1rem;
                    color: black;
                    display: table;
                    border-spacing: 2px;
                    border-color: grey;
                    border-collapse: collapse;
                    border: 1px solid #dee2e6;
                  "
                  >
                    <tr>
                      <th
                        style="
                        border: 1px solid #dee2e6;
                        text-align: start;
                        padding: 0.2rem;
                      "
                      >
                        S.No.
                      </th>
                      <th
                        style="
                        border: 1px solid #dee2e6;
                        text-align: start;
                        padding: 0.2rem;
                      "
                      >
                        Test/Exam
                      </th>
                      <th
                        style="
                        border: 1px solid #dee2e6;
                        text-align: start;
                        padding: 0.2rem;
                      "
                      >
                        Max Marks
                      </th>
                      <th
                        style="
                        border: 1px solid #dee2e6;
                        text-align: start;
                        padding: 0.2rem;
                      "
                      >
                        Marks Obtained
                      </th>
                    </tr>
                    <tbody>
                      <tr
                        style="
                        border: 1px solid #dee2e6;
                        text-align: start;
                        padding: 0.2rem;
                      "
                      >
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          1
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          Mid-term Subjective Test
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          100
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          {{ response.midtermsubj }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style="padding: 0.5rem">
                  <h3 style="margin: 0.1rem 0">Ability Scores</h3>
                  <table
                    style="
                    width: calc(100% - 1rem);
                    margin-bottom: 1rem;
                    color: black;
                    display: table;
                    border-spacing: 2px;
                    border-color: grey;
                    border-collapse: collapse;
                    border: 1px solid #dee2e6;
                  "
                  >
                    <tr>
                      <th
                        style="
                        border: 1px solid #dee2e6;
                        text-align: start;
                        padding: 0.2rem;
                      "
                      >
                        S.No.
                      </th>
                      <th
                        style="
                        border: 1px solid #dee2e6;
                        text-align: start;
                        padding: 0.2rem;
                      "
                      >
                        Ability Scores
                      </th>
                      <th
                        style="
                        border: 1px solid #dee2e6;
                        text-align: start;
                        padding: 0.2rem;
                      "
                      >
                        Max Marks
                      </th>
                      <th
                        style="
                        border: 1px solid #dee2e6;
                        text-align: start;
                        padding: 0.2rem;
                      "
                      >
                        Marks Obtained
                      </th>
                    </tr>
                    <tbody>
                      <tr>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          1
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          Project Ability Score
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          10
                        </td>
                        <td
                          style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                        >
                          {{ response.projectability }}
                        </td>
                      </tr>
                      <!-- <tr>
                      <td
                        style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                      >
                        2
                      </td>
                      <td
                        style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                      >
                        Internship Ability Score
                      </td>
                      <td
                        style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                      >
                        10
                      </td>
                      <td
                        style="
                          border: 1px solid #dee2e6;
                          text-align: start;
                          padding: 0.2rem;
                        "
                      >
                        {{ response.internshipability }}
                      </td>
                    </tr> -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- Cumulative Scores -->
          <div style="padding: 0.25rem; width: 100%">
            <h3 style="margin: 0.1rem 0rem">Cumulative Scores</h3>
            <table
              style="
              width: calc(100% - 1rem);
              margin-bottom: 1rem;
              color: black;
              display: table;
              border-spacing: 2px;
              border-color: grey;
              border-collapse: collapse;
              border: 1px solid #dee2e6;
            "
            >
              <thead>
                <tr>
                  <th
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    S.No.
                  </th>
                  <th
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    Name
                  </th>
                  <th
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    Max Score
                  </th>
                  <th
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    Score Obtained
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    1
                  </td>
                  <td
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    Cumulative Objective Score*
                  </td>
                  <td
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    100
                  </td>
                  <td
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    {{ response.cumulativeobjective }}
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    2
                  </td>
                  <td
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    Cumulative Subjective Score*
                  </td>
                  <td
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    100
                  </td>
                  <td
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    {{ response.cumulativesubjective }}
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    3
                  </td>
                  <td
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    Cumulative Ability Score
                  </td>
                  <td
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    10
                  </td>
                  <td
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    {{ response.cumulativeabilityscore }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- <div style="width: 100%; padding: 0.25rem">
          <h5 style="margin: 0.1rem 0rem">
            On the basis of your Cumulative scores , you are eligible for
          </h5>
          <table
            style="
              width: calc(100% - 1rem);
              margin-bottom: 1rem;
              color: black;
              display: table;
              border-spacing: 2px;
              border-color: grey;
              border-collapse: collapse;
              border: 1px solid #dee2e6;
            "
          >
            <tbody>
              <tr>
                <td
                  style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                >
                  1
                </td>
                <td
                  style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                >
                  Placement Guarantee
                </td>

                <td
                  style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                >
                  {{ response.placementguarantee }}
                </td>
              </tr>
              <tr>
                <td
                  style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                >
                  2
                </td>
                <td
                  style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                >
                  Placement Assistance
                </td>

                <td
                  style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                >
                  Yes
                </td>
              </tr>
            </tbody>
          </table>
        </div> -->

          <div style="padding: 0.25rem; width: 100%">
            <h5 style="margin: 0.1rem 0rem">Note:</h5>
            <table
              style="
              width: calc(100% - 1rem);
              margin-bottom: 1rem;
              color: black;
              display: table;
              border-spacing: 2px;
              border-color: grey;
              border-collapse: collapse;
              border: 1px solid #dee2e6;
            "
            >
              <tbody>
                <!-- <tr>
                <td
                  style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                >
                  1
                </td>
                <td
                  style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                >
                  For any error in the report, we expect you to revert within
                  three days of report sharing.
                </td>
              </tr> -->
                <!-- <tr>
                <td
                  style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                >
                  2
                </td>
                <td
                  style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                >
                  In case you fail to revert, by default it will be considered
                  as your acceptance.
                </td>
              </tr> -->
                <!-- <tr>
                <td
                  style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                >
                  2
                </td>
                <td
                  style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                >
                  Placement Guarantee can be revoked if absenteeism is marked in
                  "Pre-Placement Process".
                </td>
              </tr>
              <tr>
                <td
                  style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                >
                  3
                </td>
                <td
                  style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                >
                  Certificates will be shared with you in next 15 working days.
                </td>
              </tr>

              <tr>
                <td
                  style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                >
                  4
                </td>
                <td
                  style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                >
                  Cumulative scores are the average of the respective
                  assessments/score.
                </td>
              </tr> -->

                <tr>
                  <td
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    *
                  </td>
                  <td
                    style="
                    border: 1px solid #dee2e6;
                    text-align: start;
                    padding: 0.2rem;
                  "
                  >
                    Cumulative scores are the average of the respective
                    assessments/scores.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>

        <footer style="width: 90%; margin: auto; padding-top: 0.5rem">
          <h5 style="text-align: center">
            We thank you again for being a part of DataTrained. <br />
            Wishing you luck and happy learning!
          </h5>

          <small
            class="text-center d-block"
            style="text-align: center; display: block; margin-top: 0.3rem"
          >
            Data Trained Education , Bengaluru, Karnataka</small
          >
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      response: {},
    };
  },

  // beforeCreate() {
  //   window.location.reload();
  // },
};
</script>

<style lang="scss" scoped>
/* component wide css*/
.abc {
  background-image: url(../assets/watermark2.png);
}
</style>
