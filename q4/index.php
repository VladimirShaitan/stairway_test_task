<?php 
	$az_to_sort = array(
		['L' => 12],
		['M' => 13],
		['N' => 14],
		['H' => 8],
		['H' => 8],
		['I' => 9],
		['J' => 10],
		['K' => 11],
		['I' => 9],
		['J' => 10],
		['A' => 1],
		['B' => 2],
		['C' => 3],
		['D' => 4],
		['E' => 5],
		['V' => 22],
		['W' => 23],
		['Z' => 26],
		['S' => 19],
		['T' => 20],
		['E' => 5],
		['F' => 6],
		['G' => 7],
		['V' => 22],
		['W' => 23],
		['X' => 24],
		['M' => 13],
		['N' => 14],
		['O' => 15],
		['P' => 16],
		['Q' => 17],
		['R' => 18],
		['Y' => 25],
		['F' => 6],
		['G' => 7],
		['P' => 16],
		['Q' => 17],
		['R' => 18],
		['S' => 19],
		['T' => 20],
		['K' => 11],
		['L' => 12],
		['Z' => 26],
		['U' => 21],
		['O' => 15],
		['A' => 1],
		['B' => 2],
		['C' => 3],
		['D' => 4],
		['X' => 24],
		['Y' => 25],
		['U' => 21],
		['V' => 22],
		['W' => 23],
		['Z' => 26],
		['S' => 19],
		['T' => 20],
		['E' => 5],
		['F' => 6],
		['G' => 7],
		['V' => 22],
		['W' => 23],
		['X' => 24],
		['M' => 13],
		['N' => 14],
		['O' => 15],
		['P' => 16],
		['Q' => 17],
		['R' => 18],
		['Y' => 25],
	);


	// makes a unique array by inner array first key
	function array_unique_char($array) { 
		$tmp = $key_array = array(); 
		$i = 0; 
	 
		foreach($array as $val) { 
			if (!in_array($val[array_key_first($val)], $key_array)) { 
				$key_array[$i] = $val[array_key_first($val)]; 
				$tmp[$i] = $val; 
			} 
			$i++; 
		} 
		return $tmp; 
	}


	function get_alphabet_chars_array($arr) {
		$unique_az = array_unique_char($arr);
		$az_sorted = array();

		foreach ($unique_az as $char) {
			$az_sorted[strtolower(array_key_first($char))] = $char[array_key_first($char)]; 
		}

		ksort($az_sorted);

		return $az_sorted; 
	}

	$sorted_az = get_alphabet_chars_array($az_to_sort);
	print_r($sorted_az);