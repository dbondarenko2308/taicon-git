$(document).ready(function () {
$(function() {
	var sliderThumbnail = new Swiper('.detal__container', {
		slidesPerView: 5,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		spaceBetween: 10
	})

	var slider = new Swiper('.detal__top', {
		thumbs: {
			swiper: sliderThumbnail
		},

		pagination: {
			clickable: true,
			el: '.swiper-pagination'
		},

		navigation: {
			prevEl: '.swiper-button__prev',
			nextEl: '.swiper-button__next'
		}
	})

	$('[data-func-tab]').on('click', function() {
		if (!$(this).hasClass('active')) {
			var index = $(this).index()
			$(this).addClass('active').siblings().removeClass('active')
			$('[data-func-item]').removeClass('active').eq(index).addClass('active')
		}
		return false
	})

	$(function() {
		$('.detal-vid__play').on('click', function() {
			const $wrap = $(this).closest('.detal-vid__video')
			const video = $wrap.find('video').get(0)

			video.play()
			$(this).fadeOut()

			setTimeout(() => {
				$(video).attr('controls', true)
			}, 500)
		})
	})

	const detalSlider = new Swiper('.detal-slider__slider', {
		slidesPerView: 1,
		spaceBetween: 20,

		navigation: {
			prevEl: '.swiper-button__prev',
			nextEl: '.swiper-button__next'
		},

		breakpoints: {
			991: {
				slidesPerView: 1.625,
				loop: true
			}
		}
	})

	$('.detal__video--arrow, .detal__video--text').on('click', function() {
		$(this).closest('.detal__video').find('[data-fancybox]').trigger('click')
	})

	$('.detal-links a').on('click', function(e) {
		e.preventDefault()

		const index = $(this).index()
		const target = $('[data-scroll-item]').eq(index)

		if (target.length) {
			$('html, body').animate(
				{
					scrollTop: target.offset().top - 180
				},
				500
			)
		}
	})

	function initMenu() {
		if (window.innerWidth > 991) {
			$('.menu__item.dropdown').off('click').off('mouseenter mouseleave').hover(
				function() {
					$(this).addClass('is-open')
				},
				function() {
					$(this).removeClass('is-open')
				}
			)
		} else {
			$('.menu__item.dropdown')
				.off('mouseenter mouseleave')
				.off('click')
				.on('click', function(e) {
					e.preventDefault()
					$(this).toggleClass('is-open')
				})
		}
	}

	initMenu()
	$(window).on('resize', initMenu)
})

$('.header-catalog').each(function() {
	let $wrap = $(this)

	let $hovers = $wrap.find('[data-hover]')
	let $items = $wrap.find('[data-hover-item]')

	$hovers.on('mouseenter', function() {
		let index = $hovers.index(this)

		$hovers.removeClass('active')
		$(this).addClass('active')

		$items.removeClass('active').eq(index).addClass('active')
	})

	$hovers.first().addClass('active')
	$items.first().addClass('active')
})

$('.drop div svg').on('click', function() {
	$(this).parent().parent().toggleClass('active')
})

$('.header__catalog').on('click', function() {
	$('.header-catalog').toggleClass('active')
})

$('.header-catalog__close').on('click', function() {
	$('.header-catalog').removeClass('active')
	$('body').removeClass('hidden')
})

let $search = $('.header__search')
let $input = $search.find('input')
let $remove = $search.find('.header__search--remove')

$input.on('focus', function() {
	$search.addClass('active')
})

$(document).on('click', function(e) {
	if ($(e.target).closest('.header__search').length === 0) {
		$search.removeClass('active')
	}
})

$remove.on('click', function() {
	$input.val('').blur()
	$remove.removeClass('visible')
	$search.removeClass('active')
})

$(document).on('keydown', function(e) {
	if (e.key === 'Escape') {
		$search.removeClass('active')
		$input.blur()
	}
})

$input.on('input', function() {
	if ($(this).val().length > 0) {
		$remove.addClass('visible')
	} else {
		$remove.removeClass('visible')
	}
})

$('.header__country--head').on('click', function() {
	$('.header__country--body').toggleClass('active')
})

$('.header__country--body-btn').on('click', function() {
	$('.header__country--body').removeClass('active')
})

$(
	'.header__country--body-btn.btn-light, .header-mob__country'
).on('click', function() {
	$('.header-country').addClass('active')

	$('.overhidden').addClass('active')
})

const $select = $('.header-country__select')
const $head = $select.find('.header-country__select--head')
const $body = $select.find('.header-country__select--body')
const $items = $body.find('.header-country__select--items span')
const $placeholder = $head.find('span:first')

$placeholder.css('color', '#999')

$head.on('click', function() {
	$select.toggleClass('active')
	$(this).find('svg').toggleClass('open')
})

$items.on('click', function() {
	const city = $(this).text()
	$placeholder.text(city)
	$placeholder.css('color', '#1D272E')
	$select.removeClass('active')
	$head.find('svg').removeClass('open')
})

$(document).on('click', function(e) {
	if ($(e.target).closest('.header-country__select').length === 0) {
		$select.removeClass('active')
		$head.find('svg').removeClass('open')
	}
})

$('.header-country__close').on('click', function() {
	$('.header-country').removeClass('active')
	$('.overhidden').removeClass('active')
})

$('.header__burger').on('click', function() {
	$('.header-mob').addClass('active')
})

$('.header-mob__close').on('click', function() {
	$('.header-mob').removeClass('active')
})

$('.header-mob__close').on('click', function() {
	$('.header-mob-search').removeClass('active')
})

$('.header__mobile--loop').on('click', function() {
	$('.header-mob-search').addClass('active')
})

$('.header-mob__close').on('click', function() {
	$('.header-mob-search').removeClass('active')
})

const aboutNews = new Swiper('.showcase__container', {
	slidesPerView: 1,
	spaceBetween: 20,
	autoplay: {
		delay: 3000
	},

	navigation: {
		prevEl: '.showcase__prev',
		nextEl: '.showcase__next'
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
		clickable: true
	}
})

$('.field input, .field textarea').on('input change focus blur', function() {
	const $input = $(this)
	const $field = $input.closest('.field, .field-select-custom')
	const $label = $field.find('.field__label')
	const $error = $field.find('.field__error')

	if ($input.val().length > 0 || $input.is(':focus')) {
		$label.addClass('top')
		$input.removeClass('error')
		$error.hide()
	} else {
		$label.removeClass('top')
	}
})
$(document).on('select2:open', () => {
	$('body').addClass('select-close')
})

$(document).on('select2:close', () => {
	$('body').removeClass('select-close')
})

$(function() {
	const inputs = document.querySelectorAll('.form-control.tel')

	$('.iti.iti--allow-dropdown.iti--separate-dial-code').each(function() {
		const itiInstance = $(this).data('intlTelInput')
		if (itiInstance) {
			itiInstance.destroy()
		}
	})

	inputs.forEach(input => {
		const iti = intlTelInput(input, {
			initialCountry: 'ru',
			separateDialCode: true,
			formatOnDisplay: false,
			utilsScript:
				'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.0/js/utils.js'
		})

		let lastCleanNumber = ''

		input.addEventListener('input', function() {
			const countryCode = iti.getSelectedCountryData().iso2
			let phoneNumber = this.value.replace(/\D/g, '')

			if (countryCode === 'ru' || countryCode === 'kz') {
				phoneNumber = phoneNumber.substring(0, 10)
				this.value = formatPhoneNumber(phoneNumber, '(XXX) XXX-XX-XX')
			} else if (countryCode === 'uz' || countryCode === 'by') {
				phoneNumber = phoneNumber.substring(0, 9)
				this.value = formatPhoneNumber(phoneNumber, '(XX) XXX-XX-XX')
			} else {
				this.value = phoneNumber
			}

			lastCleanNumber = phoneNumber
		})

		input.addEventListener('beforeinput', function(e) {
			if (e.inputType === 'deleteContentBackward') {
				let raw = this.value.replace(/\D/g, '')
				raw = raw.slice(0, -1)

				const countryCode = iti.getSelectedCountryData().iso2

				if (raw.length === 0) {
					this.value = ''
				} else if (countryCode === 'ru' || countryCode === 'kz') {
					this.value = formatPhoneNumber(raw, '(XXX) XXX-XX-XX')
				} else if (countryCode === 'uz' || countryCode === 'by') {
					this.value = formatPhoneNumber(raw, '(XX) XXX-XX-XX')
				} else {
					this.value = raw
				}

				e.preventDefault()
			}
		})
	})

	function formatPhoneNumber(number, pattern) {
		let i = 0
		return pattern
			.replace(/X/g, () => (i < number.length ? number[i++] : ''))
			.replace(/[-()\s]+$/, '')
	}
})

$('.select2').select2({
	minimumResultsForSearch: Infinity
})

$('.select2--multi').select2({})

$(window).on('scroll', function() {
	var header = $('header')

	if ($(this).scrollTop() > 0) {
		header.addClass('fixed')
	} else {
		header.removeClass('fixed')
	}
})

const $inputCity = $('.header-country__select input')
const $itemsCity = $('.header-country__select--items span')
const $container = $('.header-country__select--items')
const $loop = $('.header-country__loop')
const $removeCity = $('.header-country__remove') // ← исправил

let $empty = $('<div class="no-results">Не найдено вариантов</div>')
$empty.hide()
$container.append($empty)

$removeCity.hide()

$inputCity.on('input', function() {
	let val = $(this).val().toLowerCase().trim()
	let found = false

	if (val.length > 0) {
		$loop.hide()
		$removeCity.show()
	} else {
		$loop.show()
		$removeCity.hide()
	}

	$itemsCity.each(function() {
		let text = $(this).text().toLowerCase()

		if (text.includes(val)) {
			$(this).show()
			found = true
		} else {
			$(this).hide()
		}
	})

	if (!found && val.length) {
		$empty.show()
	} else {
		$empty.hide()
	}
})

$removeCity.on('click', function() {
	$inputCity.val('').trigger('input').focus()
})

$('.cookies__btn').on('click', function() {
	$('.cookies').hide()
})

$('[data-field="INN"] input').on('input', function() {
	this.value = this.value.replace(/\D/g, '')
})

$('.file').each(function() {
	const $file = $(this)
	const $input = $file.find('.file__input')
	const $btn = $file.find('.file__btn')
	const $text = $file.find('.file__text')

	const defaultText = $text.html()

	const maxSize = 5 * 1024 * 1024
	const allowedExt = ['jpg', 'jpeg', 'png', 'pdf', 'docx', 'xlsx']

	$input.off('change')
	$btn.off('click')

	$btn.on('click', function() {
		if ($btn.hasClass('file__btn--remove')) {
			reset()
			$btn.removeClass('file__btn--remove').text('ЗАГРУЗИТЬ')
			$input.val('')
			return
		}

		$input.trigger('click')
	})

	$input.on('change', function() {
		const file = this.files[0]
		if (!file) return

		reset()

		const ext = file.name.split('.').pop().toLowerCase()

		if (file.size > maxSize) {
			showError('Загруженный файл должен быть не более 5 мб')
			return
		}

		if (!allowedExt.includes(ext)) {
			showError(
				'Загруженный файл должен быть формата jpeg, png, docx, xlsx, pdf'
			)
			return
		}

		success(file)
	})

	function success(file) {
		$text.html(`
		

			<div>
				<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1893 2.68934C10.8499 2.02882 11.8122 1.5 12.9 1.5H23.25C23.6478 1.5 24.0294 1.65804 24.3107 1.93934L31.0607 8.68934C31.342 8.97064 31.5 9.35218 31.5 9.75V24.6C31.5 25.6878 30.9712 26.6501 30.3107 27.3107C29.6501 27.9712 28.6878 28.5 27.6 28.5H12.9C11.8122 28.5 10.8499 27.9712 10.1893 27.3107C9.52882 26.6501 9 25.6878 9 24.6V5.4C9 4.31215 9.52882 3.34986 10.1893 2.68934ZM12.9 4.5C12.7878 4.5 12.5501 4.57118 12.3107 4.81066C12.0712 5.05014 12 5.28785 12 5.4V24.6C12 24.7122 12.0712 24.9499 12.3107 25.1893C12.5501 25.4288 12.7878 25.5 12.9 25.5H27.6C27.7122 25.5 27.9499 25.4288 28.1893 25.1893C28.4288 24.9499 28.5 24.7122 28.5 24.6V10.3713L22.6287 4.5H12.9Z" fill="#7EA5BA" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 9.9C5.32843 9.9 6 10.5716 6 11.4V30.6C6 30.7122 6.07118 30.9499 6.31066 31.1893C6.55014 31.4288 6.78785 31.5 6.9 31.5H21.6C22.4284 31.5 23.1 32.1716 23.1 33C23.1 33.8284 22.4284 34.5 21.6 34.5H6.9C5.81215 34.5 4.84986 33.9712 4.18934 33.3107C3.52882 32.6501 3 31.6878 3 30.6V11.4C3 10.5716 3.67157 9.9 4.5 9.9Z" fill="#7EA5BA" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 1.5C23.3284 1.5 24 2.17157 24 3V9H30C30.8284 9 31.5 9.67157 31.5 10.5C31.5 11.3284 30.8284 12 30 12H22.5C21.6716 12 21 11.3284 21 10.5V3C21 2.17157 21.6716 1.5 22.5 1.5Z" fill="#7EA5BA" />
</svg>
				<b>${file.name}</b>
			</div>
		`)

		$btn.addClass('file__btn--remove').text('УДАЛИТЬ')
	}

	function showError(message) {
		$text.html(`
					<div>
				<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1893 2.68934C10.8499 2.02882 11.8122 1.5 12.9 1.5H23.25C23.6478 1.5 24.0294 1.65804 24.3107 1.93934L31.0607 8.68934C31.342 8.97064 31.5 9.35218 31.5 9.75V24.6C31.5 25.6878 30.9712 26.6501 30.3107 27.3107C29.6501 27.9712 28.6878 28.5 27.6 28.5H12.9C11.8122 28.5 10.8499 27.9712 10.1893 27.3107C9.52882 26.6501 9 25.6878 9 24.6V5.4C9 4.31215 9.52882 3.34986 10.1893 2.68934ZM12.9 4.5C12.7878 4.5 12.5501 4.57118 12.3107 4.81066C12.0712 5.05014 12 5.28785 12 5.4V24.6C12 24.7122 12.0712 24.9499 12.3107 25.1893C12.5501 25.4288 12.7878 25.5 12.9 25.5H27.6C27.7122 25.5 27.9499 25.4288 28.1893 25.1893C28.4288 24.9499 28.5 24.7122 28.5 24.6V10.3713L22.6287 4.5H12.9Z" fill="#7EA5BA" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 9.9C5.32843 9.9 6 10.5716 6 11.4V30.6C6 30.7122 6.07118 30.9499 6.31066 31.1893C6.55014 31.4288 6.78785 31.5 6.9 31.5H21.6C22.4284 31.5 23.1 32.1716 23.1 33C23.1 33.8284 22.4284 34.5 21.6 34.5H6.9C5.81215 34.5 4.84986 33.9712 4.18934 33.3107C3.52882 32.6501 3 31.6878 3 30.6V11.4C3 10.5716 3.67157 9.9 4.5 9.9Z" fill="#7EA5BA" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 1.5C23.3284 1.5 24 2.17157 24 3V9H30C30.8284 9 31.5 9.67157 31.5 10.5C31.5 11.3284 30.8284 12 30 12H22.5C21.6716 12 21 11.3284 21 10.5V3C21 2.17157 21.6716 1.5 22.5 1.5Z" fill="#7EA5BA" />
</svg>
				<strong>${message}</strong>
			</div>


			
		`)

		$btn.removeClass('file__btn--remove').text('ЗАГРУЗИТЬ')
	}

	function reset() {
		$text.html(defaultText)
	}
})

$('.library__menu--item > .library__menu-title .library__arrow').click(function(
	e
) {
	e.preventDefault()
	const $arrow = $(this)
	const $submenu = $arrow
		.closest('.library__menu--item')
		.find('> .library__submenu')

	$arrow.toggleClass('active')
	$submenu.slideToggle(200)
})

$('.library__submenu-title .library__arrow').click(function(e) {
	e.preventDefault()
	const $arrow = $(this)
	const $inner = $arrow
		.closest('.library__submenu-item')
		.find('> .library__submenu-inner')

	$arrow.toggleClass('active')
	$inner.slideToggle(200)
})

$('.library__mobile--btn').on('click', function() {
	$('.library__aside').addClass('active')
})

$('.library__aside--back').on('click', function() {
	$('.library__aside').removeClass('active')
})

// $(function() {
// 	$('.field-select-custom').each(function() {
// 		const $wrapper = $(this)
// 		const $label = $wrapper.find('.field__label')
// 		const $input = $wrapper.find('input')
// 		const $dropdown = $wrapper.find('.field-select-custom__dropdown')
// 		const $items = $dropdown.find('.field-select-custom__dropdown--item')

// 		$wrapper
// 			.find('label.field, .field-select-custom__arrow')
// 			.on('click', function(e) {
// 				e.stopPropagation()
// 				$('.field-select-custom__dropdown').not($dropdown).slideUp(150)
// 				$('.field-select-custom label.field')
// 					.not($label.closest('label.field'))
// 					.removeClass('open')
// 				$dropdown.slideToggle(150)
// 				$label.closest('label.field').toggleClass('open')
// 			})

// 		$items.on('click', function(e) {
// 			e.stopPropagation()
// 			const val = $(this).text().trim()
// 			$input.val(val)
// 			$items.removeClass('active')
// 			$(this).addClass('active')
// 			$dropdown.slideUp(150)
// 			$label.closest('label.field').removeClass('open')
// 			$label.addClass('top')
// 		})

// 		$input.on('input', function() {
// 			const query = $(this).val().toLowerCase()
// 			$items.each(function() {
// 				const text = $(this).text().toLowerCase()
// 				$(this).toggle(text.indexOf(query) !== -1)
// 			})

// 			if ($(this).val().length > 0) {
// 				$label.addClass('top')
// 			} else {
// 				$label.removeClass('top')
// 			}

// 			const anyVisible = $items.filter(':visible').length > 0
// 			if (anyVisible) $dropdown.slideDown(150)
// 		})

// 		$input.on('focus', function() {
// 			$label.addClass('top')
// 		})
// 		$input.on('blur', function() {
// 			if ($input.val().length === 0) $label.removeClass('top')
// 		})
// 	})

// 	$(document).on('click', function() {
// 		$('.field-select-custom__dropdown').slideUp(150)
// 		$('.field-select-custom label.field').removeClass('open')
// 	})
// })

$('.material__tabs a').on('click', function(e) {
	e.preventDefault()

	const index = $(this).index()
	const target = $('.material__item').eq(index)

	if (target.length) {
		$('html, body').animate(
			{
				scrollTop: target.offset().top - 180
			},
			500
		)
	}
})

$(function() {
	let currentStep = 0
	let $currentSteps = null
	let selectedType = null
	let totalSteps = 0

	const $quiz = $('.quiz')
	const $head = $quiz.find('.quiz__head')
	const $footer = $quiz.find('.quiz__footer')
	const $counter = $quiz.find('.quiz__desc')
	const $progress = $quiz.find('.quiz__progress div') // // Прогресс

	const $nextMain = $quiz.find('.quiz__footer .quiz__next')

	$counter.text('')
	$progress.css('width', '0%') //// Прогресс

	$head.find('input[type="radio"]').on('change', function() {
		selectedType = $(this).closest('.radio').index() - 1
	})

	$nextMain.on('click', function() {
		if (selectedType === null) {
			alert('Выберите тип обращения')
			return
		}

		const allSteps = [
			$('.quiz__steps--first'),
			$('.quiz__steps--second'),
			$('.quiz__steps--third')
		]

		$currentSteps = allSteps[selectedType]

		$head.hide()
		$footer.hide()

		$currentSteps.addClass('active')

		const $steps = $currentSteps.find('.quiz__step')
		totalSteps = $steps.length

		currentStep = 0
		showStep()
	})

	$quiz.on('click', '.quiz__steps .quiz__next', function() {
		const $steps = $currentSteps.find('.quiz__step')

		if (currentStep < totalSteps - 1) {
			currentStep++
			showStep()
		}
	})

	$quiz.on('click', '.quiz__steps .quiz__back', function() {
		if (currentStep === 0) {
			$currentSteps.removeClass('active')
			$currentSteps = null

			$head.show()
			$footer.show()

			$counter.text('')
			$progress.css('width', '0%') // Прогресс

			return
		}

		currentStep--
		showStep()
	})

	function showStep() {
		const $steps = $currentSteps.find('.quiz__step')

		$steps.removeClass('active')
		$steps.eq(currentStep).addClass('active')

		$counter.text(`Шаг ${currentStep + 1}/${totalSteps}`)

		const $back = $currentSteps.find('.quiz__back')
		const $next = $currentSteps.find('.quiz__next')
		const $submit = $currentSteps.find('.quiz__btn')
		const $bottom = $currentSteps.find('.quiz__bottom')

		$back.show()

		if (currentStep === totalSteps - 1) {
			$next.hide()
			$submit.addClass('show')

			$bottom.addClass('is-last')
		} else {
			$next.show()
			$submit.removeClass('show')

			$bottom.removeClass('is-last')
		}

		// ПРОГРЕСС
		const percent = (currentStep + 1) / totalSteps * 100
		$progress.css('width', percent + '%')
	}
})




});