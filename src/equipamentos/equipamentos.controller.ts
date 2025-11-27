import { Body, Controller, Delete, Get, Param, Patch, Post, ParseUUIDPipe } from '@nestjs/common';
import { EquipamentoService } from './equipamentos.service';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto';
import { UpdateEquipamentoDto } from './dto/update-equipamento.dto';

@Controller('equipamentos')
export class EquipamentoController {
  constructor(private readonly equipamentoService: EquipamentoService) {}

  @Post()
  create(@Body() createEquipamentoDto: CreateEquipamentoDto) {
    return this.equipamentoService.create(createEquipamentoDto);
  }

  @Get()
  findAll() {
    return this.equipamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.equipamentoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateEquipamentoDto: UpdateEquipamentoDto,
  ) {
    return this.equipamentoService.update(id, updateEquipamentoDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.equipamentoService.remove(id);
  }
}