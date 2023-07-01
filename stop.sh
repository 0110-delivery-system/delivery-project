
function deleteimageAll()
{
    eval docker image prune -a
}

function stop()
{
    eval docker stop "$1"
}

function menu()
{
  PS3="빌드와 실행 방식을 선택하세요 > "
  COLUMNS=30
  options=("Stop" "DeleteimageAll" "Quit")
  select yn in "${options[@]}"; do
      case $yn in
          "Stop" ) stop; break;;
          "DeleteimageAll" ) deleteimageAll; break;;
          "Quit" )          exit;;
      esac
  done
}

menu $1