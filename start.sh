#!/bin/bash

function buildmySql()
{
  eval docker-compose build
}

function runMysql()
{
  
  eval docker-compose up -d
}

function buildNestServer()
{
  eval docker build -t nest-app .
}

function runNestServer()
{
  
  eval docker run -d -p 80:3000 
}

function menu()
{
  PS3="빌드와 실행 방식을 선택하세요 > "
  COLUMNS=30
  options=("MySQL Build and Run" "Nest Sever Build and Run" "MySQL Run"  "Nest Sever Run" "Quit")
  select yn in "${options[@]}"; do
      case $yn in
          "MySQL Build and Run" ) buildmySql; runMysql; break;;
          "Nest Sever Build and Run" )  build; runNestServer; break;;
          "MySQL Run" ) runMysql; break;;
          "Nest Sever Run" ) runNestServer; break;;
          "Quit" )          exit;;
      esac
  done
}

menu 