$(document).ready(function () {
    $(".dropdown-trigger").dropdown();

    $(".collapsible").collapsible();

    $(".chips").chips();

    $('.modal').modal();
});

document.addEventListener("DOMContentLoaded", function () {
    // SideNav
    var sidenavs = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenavs);

    // Select
    var selects = document.querySelectorAll("select");
    M.FormSelect.init(selects);

    // Datepicker
    var datepickers = document.querySelectorAll(".datepicker");
    M.Datepicker.init(datepickers, {
        format: "dd mmmm yyyy",
        autoClose: true,
    });

    // Slider
    // var sliders = document.querySelectorAll('.slider');
    // M.Slider.init(sliders, {
    // indicators: true,
    // interval: 5000,
    // height: 600
    // });

    // Carousel Destinasi
    var carousels = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(carousels, {
        duration: 400
    });
    setInterval(function () {
        instances.forEach(function (carousel) {
            carousel.next();
        });
    }, 4000);


    var materialboxElements =
        document.querySelectorAll('.materialboxed');

    M.Materialbox.init(materialboxElements);
});


// List Filter
var filterButtons = document.querySelectorAll('.car-filter a');
var carItems = document.querySelectorAll('.car-item');

filterButtons.forEach(function (button) {

    button.addEventListener('click', function (e) {
        e.preventDefault();

        // Ubah menu aktif
        filterButtons.forEach(function (btn) {
            btn.classList.remove('active');
        });

        this.classList.add('active');

        var filter = this.dataset.filter;

        // Fade out semua item
        carItems.forEach(function (car) {
            car.classList.add('fade-out');
        });

        // Tunggu animasi fade-out selesai
        setTimeout(function () {

            carItems.forEach(function (car) {

                if (
                    filter === 'all' ||
                    car.dataset.type === filter
                ) {
                    car.style.display = '';
                    car.classList.remove('fade-out');
                    car.classList.add('fade-in');
                } else {
                    car.style.display = 'none';
                }

            });

            // Bersihkan class setelah animasi
            setTimeout(function () {
                carItems.forEach(function (car) {
                    car.classList.remove('fade-in');
                });
            }, 500);

        }, 400);

    });

});

$(document).ready(function () {
    var sliderHeight = 600;

    if ($(window).width() <= 600) {
        sliderHeight = 200;
    } else if ($(window).width() <= 992) {
        sliderHeight = 300;
    }

    $('.slider').slider({
        indicators: true,
        height: sliderHeight
    });
});

// Modal Armada
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');

    M.Modal.init(modals);

    var datepickers = document.querySelectorAll('.datepicker');

    M.Datepicker.init(datepickers, {
        format: 'dd/mm/yyyy',
        autoClose: true,
        minDate: new Date()
    });

    var transmisiSelect = document.getElementById('transmisi');

    if (transmisiSelect) {
        M.FormSelect.init(transmisiSelect);
    }

    var buttons = document.querySelectorAll('.btn-cars');

    buttons.forEach(function (button) {

        button.addEventListener('click', function (e) {

            var mobil = this.getAttribute('data-mobil');
            var transmisi = this.getAttribute('data-transmisi');

            if (!mobil) {
                return;
            }

            var mobilInput = document.getElementById('mobil');

            if (mobilInput) {

                mobilInput.value = mobil;

                M.updateTextFields();

            }


            if (transmisiSelect) {

                // Hapus semua option
                transmisiSelect.innerHTML = '';


                // Option default
                var defaultOption =
                    document.createElement('option');

                defaultOption.value = '';
                defaultOption.disabled = true;
                defaultOption.selected = true;
                defaultOption.textContent =
                    'Pilih Transmisi';

                transmisiSelect.appendChild(defaultOption);


                // Buat option transmisi
                if (transmisi) {

                    transmisi.split(',').forEach(function (item) {

                        item = item.trim();

                        if (!item) {
                            return;
                        }

                        var option =
                            document.createElement('option');

                        option.value = item;


                        if (item === 'MT') {

                            option.textContent =
                                'Manual (MT)';

                        } else if (item === 'AT') {

                            option.textContent =
                                'Matic (AT)';

                        } else {

                            option.textContent =
                                item;

                        }


                        transmisiSelect.appendChild(option);

                    });

                }

                var instance =
                    M.FormSelect.getInstance(
                        transmisiSelect
                    );

                if (instance) {
                    instance.destroy();
                }

                M.FormSelect.init(
                    transmisiSelect
                );

            }

        });

    });

    var bookingForm =
        document.getElementById('bookingForm');


    if (bookingForm) {

        bookingForm.addEventListener(
            'submit',
            function (e) {

                e.preventDefault();

                var nama =
                    document.getElementById('nama').value.trim();

                var nomor =
                    document.getElementById('nomor_hp').value.trim();

                var tanggal =
                    document.getElementById('tanggal').value.trim();

                var mobil =
                    document.getElementById('mobil').value.trim();

                var catatan =
                    document.getElementById('catatan').value.trim();

                var transmisiElement =
                    document.getElementById('transmisi');

                var transmisi = '';


                if (
                    transmisiElement &&
                    transmisiElement.selectedIndex > 0
                ) {

                    transmisi =
                        transmisiElement.options[
                            transmisiElement.selectedIndex
                        ].text;

                }

                if (!nama) {

                    M.toast({
                        html: 'Silakan isi nama'
                    });

                    return;

                }


                if (!nomor) {

                    M.toast({
                        html: 'Silakan isi nomor WhatsApp'
                    });

                    document
                        .getElementById('nomor_hp')
                        .focus();

                    return;

                }


                if (!tanggal) {

                    M.toast({
                        html: 'Silakan pilih tanggal'
                    });

                    return;

                }


                if (!mobil) {

                    M.toast({
                        html: 'Mobil belum dipilih'
                    });

                    return;

                }


                if (!transmisi) {

                    M.toast({
                        html: 'Silakan pilih transmisi'
                    });

                    return;

                }


                var nomorAdmin = '6281234567890';

                var pesan =
                    'Halo, saya ingin melakukan pemesanan.\n\n' +

                    '*DATA PEMESAN*\n' +
                    'Nama: ' + nama + '\n' +
                    'WhatsApp: ' + nomor + '\n\n' +

                    '*DETAIL PEMESANAN*\n' +
                    'Tanggal: ' + tanggal + '\n' +
                    'Mobil: ' + mobil + '\n' +
                    'Transmisi: ' + transmisi;


                if (catatan) {

                    pesan +=
                        '\n\n*CATATAN*\n' +
                        catatan;

                }

                var url =
                    'https://wa.me/' +
                    nomorAdmin +
                    '?text=' +
                    encodeURIComponent(pesan);


                window.open(url, '_blank');

                var modal =
                    document.getElementById('modal-armada');

                if (modal) {

                    var modalInstance =
                        M.Modal.getInstance(modal);

                    if (modalInstance) {
                        modalInstance.close();
                    }

                }

            }
        );

    }

    M.updateTextFields();

});


var tourModal = document.getElementById('modal-tour');

if (tourModal) {

    M.Modal.init(tourModal);

}


var tourDatepickers =
    document.querySelectorAll('.tour-datepicker');

if (tourDatepickers.length > 0) {

    M.Datepicker.init(tourDatepickers, {

        format: 'dd/mm/yyyy',

        autoClose: true,

        minDate: new Date()

    });

}


var tourButtons =
    document.querySelectorAll('.tour-btn-gold');

tourButtons.forEach(function (button) {

    button.addEventListener('click', function () {

        var paket =
            this.getAttribute('data-paket');

        var durasi =
            this.getAttribute('data-durasi');


        var paketInput =
            document.getElementById('tour_paket');

        var durasiInput =
            document.getElementById('tour_durasi');


        /* Isi nama paket */

        if (paketInput && paket) {

            paketInput.value = paket;

        }


        /* Isi durasi */

        if (durasiInput && durasi) {

            durasiInput.value = durasi;

        }


        /* Update label Materialize */

        M.updateTextFields();

    });

});

var tourBookingForm =
    document.getElementById('tourBookingForm');


if (tourBookingForm) {

    tourBookingForm.addEventListener(
        'submit',
        function (e) {

            e.preventDefault();


            /* DATA */

            var nama =
                document
                    .getElementById('tour_nama')
                    .value
                    .trim();


            var nomor =
                document
                    .getElementById('tour_nomor_hp')
                    .value
                    .trim();


            var tanggal =
                document
                    .getElementById('tour_tanggal')
                    .value
                    .trim();


            var paket =
                document
                    .getElementById('tour_paket')
                    .value
                    .trim();


            var durasi =
                document
                    .getElementById('tour_durasi')
                    .value
                    .trim();


            var jumlah =
                document
                    .getElementById('tour_jumlah')
                    .value
                    .trim();


            var catatan =
                document
                    .getElementById('tour_catatan')
                    .value
                    .trim();


            if (!nama) {

                M.toast({
                    html: 'Silakan isi nama'
                });

                document
                    .getElementById('tour_nama')
                    .focus();

                return;

            }


            if (!nomor) {

                M.toast({
                    html: 'Silakan isi nomor WhatsApp'
                });

                document
                    .getElementById('tour_nomor_hp')
                    .focus();

                return;

            }


            if (!tanggal) {

                M.toast({
                    html: 'Silakan pilih tanggal perjalanan'
                });

                return;

            }


            if (!paket) {

                M.toast({
                    html: 'Paket tour belum dipilih'
                });

                return;

            }


            if (!jumlah || jumlah < 1) {

                M.toast({
                    html: 'Jumlah peserta belum benar'
                });

                return;

            }

            var nomorAdmin =
                '6281234567890';

            var pesan =
                'Halo, saya ingin melakukan pemesanan paket tour.\n\n' +

                '*DATA PEMESAN*\n' +

                'Nama: ' +
                nama +
                '\n' +

                'WhatsApp: ' +
                nomor +
                '\n\n' +

                '*DETAIL PAKET TOUR*\n' +

                'Paket: ' +
                paket +
                '\n' +

                'Durasi: ' +
                durasi +
                '\n' +

                'Tanggal: ' +
                tanggal +
                '\n' +

                'Jumlah Peserta: ' +
                jumlah;

            if (catatan) {

                pesan +=
                    '\n\n*CATATAN*\n' +
                    catatan;

            }

            var url =
                'https://wa.me/' +
                nomorAdmin +
                '?text=' +
                encodeURIComponent(pesan);

            window.open(url, '_blank');

            var modal =
                document.getElementById('modal-tour');


            if (modal) {

                var modalInstance =
                    M.Modal.getInstance(modal);

                if (modalInstance) {

                    modalInstance.close();

                }

            }

        }
    );

}

document.getElementById("nomor_hp").addEventListener("input", function () {
    // Hanya izinkan angka dan tanda +
    this.value = this.value.replace(/[^0-9+]/g, "");

    // Tanda + hanya boleh berada di posisi pertama
    if (this.value.includes("+")) {
        this.value = "+" + this.value.replace(/\+/g, "");
    }
});

document.getElementById("tour_nomor_hp").addEventListener("input", function () {
    // Hanya izinkan angka dan tanda +
    this.value = this.value.replace(/[^0-9+]/g, "");

    // Tanda + hanya boleh berada di posisi pertama
    if (this.value.includes("+")) {
        this.value = "+" + this.value.replace(/\+/g, "");
    }
});

const backToTop = document.getElementById("backToTop");

// Tampilkan tombol setelah scroll
window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

// Smooth scroll ke atas
backToTop.addEventListener("click", function (e) {
    e.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


