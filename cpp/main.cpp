#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>

const std::string INPUT_FILE = "./data/6.txt";
const int READY_TO_GIVE_BIRTH = 0;
const int JUST_GAVE_BIRTH = 6;
const int JUST_BORN = 8;
const int DAYS = 256;

std::vector<int> getInput() {
  std::ifstream input_stream(INPUT_FILE);

  std::string input;

  input_stream.seekg(0, std::ios::end);
  input.reserve(input_stream.tellg());
  input_stream.seekg(0, std::ios::beg);

  input.assign((std::istreambuf_iterator<char>(input_stream)),
             std::istreambuf_iterator<char>());

  // Split the string by commas and store the values in a vector of ints
  std::vector<int> input_numbers;
  std::stringstream ss(input);
  std::string token;
  while (std::getline(ss, token, ',')) {
    input_numbers.push_back(std::stoi(token));
  }

  return input_numbers;
}

std::vector<int> growSchool(const std::vector<int>& school) {
  std::vector<int> result;

  for(int fish : school) {
    if (fish == READY_TO_GIVE_BIRTH) {
      result.push_back(JUST_GAVE_BIRTH);
      result.push_back(JUST_BORN);
    } else {
      result.push_back(fish - 1);
    }
  }

  return result;
}

int main() {
  // Read the input file
  const std::vector<int> input = getInput();
  std::vector<int> result = input;

  for (int i = 0; i < DAYS; ++i) {
    result = growSchool(result);
  }

  std::cout << result.size() << std::endl;
  return 0;
}
