function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
}

let arrDatanya = [];
// versi Class
class Datanya {
  constructor(nama, umur, usangu) {
    this.nama = nama;
    this.umur = umur;
    this.usangu = usangu;
  }
}

const btncek = document.querySelector('.btn');
btncek.addEventListener('click', function () {
  const nama = document.querySelector('#nama');
  const umur = document.querySelector('#umur');
  const usangu = document.querySelector('#usangu');

  if (nama.value.length >= 10 && umur.value >= 25 && usangu.value >= 100000 && usangu.value <= 1000000) {
    simpan();
    show();

    alert('data tersimpan!');
    nama.style.boxShadow = '3px 5px 5px rgba(255,0,0,0)';
    umur.style.boxShadow = '3px 5px 5px rgba(255,0,0,0)';
    usangu.style.boxShadow = '3px 5px 5px rgba(255,0,0,0)';
    nama.value = '';
    umur.value = '';
    usangu.value = '';
  } else {
    if (nama.value.length < 10) {
      nama.style.boxShadow = '3px 5px 5px rgba(255,0,0,0.5)';
      alert('Nama minimal 10 karakter');
    }
    if (umur.value < 25) {
      umur.style.boxShadow = '3px 5px 5px rgba(255,0,0,0.5)';
      alert('Umur minimal 25 tahun');
    }
    if (usangu.value < 100000 || usangu.value > 1000000) {
      usangu.style.boxShadow = '3px 5px 5px rgba(255,0,0,0.5)';
      alert('Uang sangu minimal 100 ribu dan maksimal 1 juta');
    }
  }
});

async function simpan() {
  const nama = document.querySelector('#nama').value;
  const umur = document.querySelector('#umur').value;
  const usangu = document.querySelector('#usangu').value;

  let newDatanya = new Datanya(nama, umur, usangu);
  arrDatanya.push({ nama: newDatanya.nama, umur: newDatanya.umur, usangu: newDatanya.usangu });
}

function show() {
  var outputHTML = '';
  let rata2 = 0;
  let rata2fix = 0;
  let jumlah = 0;

  const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  outputHTML += "<table class='table table-striped'>";
  outputHTML += '<tr><th> Nama </th> <th> Umur </th><th> Uang Sangu </th></tr>';
  for (let i = 0; i < arrDatanya.length; i++) {
    outputHTML += '<tr><td>' + arrDatanya[i].nama + '</td>' + '<td>' + arrDatanya[i].umur + '</td>' + '<td>' + rupiah(arrDatanya[i].usangu) + '</tr>';

    jumlah += parseInt(arrDatanya[i].usangu);
    rata2 += parseInt(arrDatanya[i].umur);

    // console.log(arrDatanya[i].nama);
    // console.log(arrDatanya[i].umur);
    // console.log(arrDatanya[i].usangu);
  }

  rata2fix = rata2 / arrDatanya.length;
  outputHTML += '</table> <h3> Rata rata pendaftar memiliki uang sangu sebesar : ' + rupiah(jumlah) + ' dengan rata rata umur : ' + parseFloat(rata2fix).toFixed(1) + '</h3>';

  document.querySelector('#show').innerHTML = outputHTML;
}
