$(document).ready(function() {
	$(function() {
		function initMenu() {
			if (window.innerWidth > 991) {
				$('.menu__item.dropdown')
					.off('click')
					.off('mouseenter mouseleave')
					.hover(
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
		const $field = $(this).parent()
		const $label = $field.find('.field__label')
		const $error = $field.find('.field__error')

		if ($(this).val().length > 0) {
			$label.addClass('top')
			$(this).removeClass('error')
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
		const $progress = $file.find('.file__progress')
		const $bar = $file.find('.file__bar-inner')
		const $success = $file.find('.file__success')
		const $error = $file.find('.file__error')
		const $text = $file.find('.file__text')

		const defaultText = $text.html()

		const maxSize = 5 * 1024 * 1024
		const allowedExt = ['jpg', 'jpeg', 'png', 'pdf', 'docx', 'xlsx']

		// защита от дублей
		$input.off('change')
		$btn.off('click')

		// открыть файл
		$btn.on('click', function() {
			$input.trigger('click')
		})

		// выбор файла
		$input.on('change', function() {
			const file = this.files[0]
			if (!file) return

			reset()

			const ext = file.name.split('.').pop().toLowerCase()

			if (file.size > maxSize) {
				showError('Файл должен быть не более 5 МБ')
				return
			}

			if (!allowedExt.includes(ext)) {
				showError('Неверный формат файла')
				return
			}

			upload(file)
		})

		function upload(file) {
			$file.addClass('is-loading')
			$progress.show()
			$progress.find('.file__name').text(file.name)

			let percent = 0

			const interval = setInterval(() => {
				percent += 10
				$bar.css('width', percent + '%')

				if (percent >= 100) {
					clearInterval(interval)
					success(file)
				}
			}, 150)
		}

		function success(file) {
			$file.removeClass('is-loading').addClass('is-success')

			$progress.hide()
			$success.show()
			$success.find('.file__name').text(file.name)

			$btn.text('ЗАМЕНИТЬ')

			// меняем текст
			$text.html(`
            Файл загружен:<br>
            <b>${file.name}</b>
        `)

			$input.val('')
		}

		function showError(text) {
			$file.addClass('is-error')
			$error.text(text).show()

			// меняем текст
			$text.html(`
            <span style="color:red">${text}</span><br>
            Попробуйте снова
        `)

			$btn.text('ЗАГРУЗИТЬ')
		}

		function reset() {
			$file.removeClass('is-error is-success is-loading')
			$error.hide().text('')
			$success.hide()
			$progress.hide()
			$bar.css('width', '0%')

			// вернуть дефолт
			$text.html(defaultText)
		}

		// удалить файл
		$file.on('click', '.file__remove', function() {
			reset()
			$btn.text('ЗАГРУЗИТЬ')
			$input.val('')
		})
	})
})
