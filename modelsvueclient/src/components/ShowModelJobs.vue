<template>
  <div>
    <h1>Modelnavn: </h1>

    <table id="jobs">
      <tr>
        <th>Kunde</th>
        <th>Startdato</th>
        <th>Antal dage</th>
        <th>Lokation</th>
        <th>Kommentarer</th>
        <th>Se / Tilføj Udgifter</th>
      </tr>
    </table>
    <br><br>
  </div>
</template>

<script>
export default {
  data() {
    return {
    modelId: localStorage.getItem('ModelId'),
  }
  }
}
</script>

<style scoped>
#jobs {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

#jobs td,
#jobs th {
  border: 1px solid #ddd;
  padding: 8px;
}

#jobs tr:nth-child(even) {
  background-color: #f2f2f2;
}

#jobs tr:hover {
  background-color: #ddd;
}

#jobs th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #37afcb;
  color: white;
}
</style>