$(function() {
	let currentStep = 0
	let $currentSteps = null
	let selectedType = null
	let totalSteps = 0

	const $quiz = $('.quiz')
	const $head = $quiz.find('.quiz__head')
	const $footer = $quiz.find('.quiz__footer')
	const $counter = $quiz.find('.quiz__desc')

	const $nextMain = $quiz.find('.quiz__footer .quiz__next')

	$counter.text('')

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
	}
})
